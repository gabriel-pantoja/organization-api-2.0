import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ProfileIdEnum, ProfileNameEnum } from '../enums/profile.enum';
import { FinancialControlService } from './financial-control.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private financialControlService: FinancialControlService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.active) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    if (user.userId == null || user.planId != null) {
      const financialControl = user.financialControl.find(
        (x) =>
          x.datePayment.getMonth() == new Date().getMonth() &&
          x.datePayment.getFullYear() == new Date().getFullYear(),
      );

      if (!financialControl) {
        throw new UnauthorizedException();
      }

      if (!financialControl.hasPay) {
        throw new UnauthorizedException();
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextMonthPayment = new Date(financialControl.datePayment);
      nextMonthPayment.setMonth(nextMonthPayment.getMonth() + 1);

      const differenceInDays = Math.ceil(
        (today.getTime() - nextMonthPayment.getTime()) / (1000 * 3600 * 24),
      );

      if (differenceInDays >= -10) {
        const hasNextMonthPayment = user.financialControl.find(
          (x) =>
            x.datePayment.getMonth() == nextMonthPayment.getMonth() &&
            x.datePayment.getFullYear() == nextMonthPayment.getFullYear() &&
            x.userId == user.id,
        );
        if (!hasNextMonthPayment) {
          this.financialControlService.create({
            userId: user.id,
            formPayment: null,
            hasPay: null,
            datePayment: nextMonthPayment,
          });
        }
      }
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      sub: user.id,
      profileId: user.profileId,
      profile: user.profile.name,
      userId: user.userId,
      planId: user.planId,
      lastAccess: user.lastAccess,
    };

    this.userService.updateLastAccess(user.id);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
