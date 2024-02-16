import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private userRepository: Repository<User>, // private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const queryRunner = this.connection.createQueryRunner();

    try {
      // await queryRunner.connect();
      // await queryRunner.startTransaction();

      let user = this.userRepository.create(createUserDto);

      // user = await queryRunner.manager.save(user);
      // await queryRunner.commitTransaction();

      console.log({ user });
      return user;
    } catch (err) {
      console.log({ err });
      // await queryRunner.rollbackTransaction();
    } finally {
      // await queryRunner.release();
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneByEmailAndPassword(email: string, password: string) {
    return this.userRepository.findOne({ where: { email, password } });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
