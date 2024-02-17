import { IsBoolean, IsNumber, IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { stringToNumber } from './transforms/stringToNumber.transform';
import { stringToBoolean } from './transforms/stringToBoolean.transform';

export class GetUserDto {

  @Transform(stringToNumber)
  @IsNumber()
  @Min(0)
  @IsOptional()
  take: number;

  @Transform(stringToNumber)
  @IsNumber()
  @Min(0)
  @IsOptional()
  skip: number;

  @Transform(stringToBoolean)
  @IsBoolean()
  @IsOptional()
  shouldFetchUsersFromApi?: boolean;

  @ValidateIf(o => o.shouldFetchUsersFromApi === true)
  @IsNumber()
  @IsPositive()
  @Transform(stringToNumber)
  page: number;
}
