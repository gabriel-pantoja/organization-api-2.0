import { Module } from '@nestjs/common';
import { DebtService } from '../core/services/debt.service';
import { DebtController } from '../controllers/debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from 'src/data/entities/debt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  controllers: [DebtController],
  providers: [DebtService],
})
export class DebtModule {}
