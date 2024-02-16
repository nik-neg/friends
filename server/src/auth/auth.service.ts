import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/RegisterDto.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode, SALT_ROUNDS } from './consts';
import { LoginDto } from './dto/LoginDto.dto';
import { CreateUserDto } from '../user/dto/CreateUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {

    const { email, password: pass } = loginDto;

    const user = await this.getAuthenticatedUser(email, pass);

    const payload = {
      sub: user.id,
      username: `${user.first_name} ${user.last_name}`,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, SALT_ROUNDS);
    try {
      const newDto = new CreateUserDto({
        ...registerDto,
        password: hashedPassword,
      });
      const createdUser = await this.userService.create(newDto);

      const { email, password: pass } = registerDto;
      const user = await this.getAuthenticatedUser(email, pass);

      const payload = {
        sub: user.id,
        username: `${user.first_name} ${user.last_name}`,
      };
      return {
        ...createdUser,
        access_token: await this.jwtService.signAsync(payload),
      };

    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
