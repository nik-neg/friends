import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  constructor(data: CreateUserDto) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.password = data.password;
    this.avatar = data.avatar;
  }
}
