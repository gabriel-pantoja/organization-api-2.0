import { Module } from '@nestjs/common';
import { DebtService } from '../core/services/debt.service';
import { DebtController } from '../controllers/debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from 'src/data/entities/debt.entity';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { LinkedDebtUserService } from 'src/core/services/linked-debt-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Debt, LinkedDebtUser])],
  controllers: [DebtController],
  providers: [DebtService, LinkedDebtUserService],
})
export class DebtModule {}
