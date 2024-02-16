import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { CreateUserDto } from './CreateUserDto.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ValidateIf(o => o.first_name === true)
  last_name?: string;
}
