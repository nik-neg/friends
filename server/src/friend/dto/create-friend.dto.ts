import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsNumber()
  userId: number;

  @IsString()
  friendImage: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
