import { ConflictException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { omit } from 'lodash';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { FriendService } from '../friend/friend.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => FriendService))
    private readonly friendService: FriendService,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();


      const USER_SERVICE_API_URL = this.configService.get('USER_SERVICE_API_URL');

      const { data } = await this.httpService.post(USER_SERVICE_API_URL, {
        ...omit(createUserDto, 'password'),
        avatar: `https://reqres.in/img/faces/${Math.random() * 1000}-image.jpg`,

      }).toPromise();

      const newDto = new CreateUserDto({ ...data, password: createUserDto.password });


      let user: User = this.userRepository.create(newDto);

      user = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return omit(user, 'password') as User;

    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query) {

    const take = query.take || 10;
    const skip = query.skip || 0;
    const shouldFetchUsersFromApi = query.shouldFetchUsersFromApi || false;
    const page = query.page || 1;

    try {
      if (shouldFetchUsersFromApi) {
        const USER_SERVICE_API_URL = this.configService.get('USER_SERVICE_API_URL');

        const { data } = await this.httpService.get(USER_SERVICE_API_URL, {
          params: {
            page,
          },
        }).toPromise();

        return data;
      }

      const [users, count] = await this.userRepository.findAndCount({
        select: ['id', 'email', 'first_name', 'last_name', 'avatar'],
        take,
        skip,
      });
      return { users, count };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (err) {
      this.logger.error(err);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.friends', 'friends')
        .getOne();

      return omit(user, 'password') as User;

    } catch (err) {
      this.logger.error(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const updatedUser = await this.userRepository.save({ ...user, ...updateUserDto });

      await queryRunner.commitTransaction();
      return updatedUser;

    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

  }

  async addFriend(userId: number, friendId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });
    const friend = await this.friendService.findOne(friendId);

    if (user && friend) {
      user.friends.push(friend);
      await this.userRepository.save(user);
    }
  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.findOne({ where: { id }, relations: ['friends'] });
      if (user) {
        user.friends = user.friends.filter(friend => friend.id !== id);
        await this.userRepository.save(user);
      }

      const res = await this.userRepository.delete(id);
      await queryRunner.commitTransaction();

      return res;

    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async removeFriendFromUser(userId: number, friendId: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['friends'],
      });

      if (user) {
        user.friends = user.friends.filter(friend => friend.id !== friendId);
        await this.userRepository.save(user);
      }
    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}
