import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  // constructor(data: RegisterDto) {
  //   this.first_name = data.first_name;
  //   this.last_name = data.last_name;
  //   this.email = data.email;
  //   this.password = data.password;
  // }

}
