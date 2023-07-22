import { Module } from '@nestjs/common';
import { AuthService } from '../core/services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/constants/jwt.constant';
import { FinancialControlService } from 'src/core/services/financial-control.service';
import { FinancialControl } from 'src/data/entities/financial-control.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([FinancialControl]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FinancialControlService],
})
export class AuthModule {}
