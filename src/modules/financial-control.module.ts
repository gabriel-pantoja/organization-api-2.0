import { Module } from '@nestjs/common';
import { FinancialControlService } from '../core/services/financial-control.service';
import { FinancialControlController } from '../controllers/financial-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialControl } from 'src/data/entities/financial-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialControl])],
  controllers: [FinancialControlController],
  providers: [FinancialControlService],
  exports: [FinancialControlService],
})
export class FinancialControlModule {}
