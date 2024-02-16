import { IsNumber, IsPositive } from 'class-validator';

export class GetUserDto {

  @IsNumber()
  @IsPositive()
  take: number;

  @IsNumber()
  @IsPositive()
  skip: number;

}
