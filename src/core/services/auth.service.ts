import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(userName);
    if (!user) {
      throw new UnauthorizedException();
    }
    // if (!(await bcrypt.compare(pass, user.password))) {
    //   throw new UnauthorizedException();
    // }
    const payload = {
      userName: user.userName,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const payload = { id: user.id, userName: user.userName };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
