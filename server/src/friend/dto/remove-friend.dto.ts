import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { stringToNumber } from './transforms/stringToNumber.transform';

export class RemoveFriendDto {

  @IsNumber()
  @Transform(stringToNumber)
  userId: number;

  @IsNumber()
  @Transform(stringToNumber)
  friendId: number;
}