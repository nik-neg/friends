import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor() {}

  async signIn(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOneByEmailAndPassword(email, pass);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return 'result';
  }
}
