import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
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

      return user;

    } catch (err) {
      console.log(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(query) {

    const take = query.take || 10;
    const skip = query.skip || 0;

    return this.userRepository.findAndCount({
      select: ['id', 'email', 'first_name', 'last_name', 'avatar'],
      take,
      skip,
    });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const res = this.userRepository.update(id, updateUserDto);

      await queryRunner.commitTransaction();
      return res;

    } catch (err) {
      console.log(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const res = this.userRepository.delete(id);
      await queryRunner.commitTransaction();
      return res;

    } catch (err) {
      console.log(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
