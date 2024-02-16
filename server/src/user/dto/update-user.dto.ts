import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
