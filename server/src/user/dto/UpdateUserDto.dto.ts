import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './CreateUserDto.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name?: string;
}
