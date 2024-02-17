import { Injectable, Logger } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { omit } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {

  private readonly logger = new Logger(FriendService.name);

  constructor(
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    private userService: UserService,
    private readonly connection: Connection) {
  }

  async create(createFriendDto: CreateFriendDto) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();


      let friend = this.friendRepository.create(omit(createFriendDto, 'userId'));
      const user = await this.userService.findOne(createFriendDto.userId);
      friend.users.push(user);
      await this.friendRepository.save(friend);

      friend = await queryRunner.manager.save(friend);
      await queryRunner.commitTransaction();

      return omit(friend, 'password') as Friend;

    } catch (err) {
      this.logger.error(err);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
