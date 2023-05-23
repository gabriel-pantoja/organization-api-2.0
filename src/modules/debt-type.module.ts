import { Module } from '@nestjs/common';
import { DebtTypeService } from '../core/services/debt-type.service';
import { DebtTypeController } from '../controllers/debt-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtType } from 'src/data/entities/debt-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebtType])],
  controllers: [DebtTypeController],
  providers: [DebtTypeService],
})
export class DebtTypeModule {}
