import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  @IsString()
  friendImage: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
