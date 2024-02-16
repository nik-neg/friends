import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

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

      let user = this.userRepository.create(createUserDto);

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

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'first_name', 'last_name', 'avatar'],
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
