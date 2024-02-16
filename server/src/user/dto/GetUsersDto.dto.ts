import { IsBoolean, IsNumber, IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { stringToNumber } from './transforms/stringToNumber.transform';

export class GetUserDto {

  @Transform(stringToNumber)
  @IsNumber()
  @Min(0)
  take: number;

  @Transform(stringToNumber)
  @IsNumber()
  @Min(0)
  skip: number;

  @IsBoolean()
  @IsOptional()
  shouldFetchUserFromApi?: boolean;

  @ValidateIf(o => o.shouldFetchUserFromApi === true)
  @IsNumber()
  @IsPositive()
  @Transform(stringToNumber)
  page: number;
}
