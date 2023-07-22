import { Module } from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/data/entities/user.entity';
import { PlanService } from 'src/core/services/plan.service';
import { Plan } from 'src/data/entities/plan.entity';
import { FinancialControl } from 'src/data/entities/financial-control.entity';
import { FinancialControlService } from 'src/core/services/financial-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan, FinancialControl])],
  controllers: [UserController],
  providers: [UserService, PlanService, FinancialControlService],
  exports: [UserService],
})
export class UserModule {}
