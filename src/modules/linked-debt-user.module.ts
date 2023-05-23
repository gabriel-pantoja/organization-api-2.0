import { Module } from '@nestjs/common';
import { LinkedDebtUserService } from '../core/services/linked-debt-user.service';
import { LinkedDebtUserController } from '../controllers/linked-debt-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkedDebtUser])],
  controllers: [LinkedDebtUserController],
  providers: [LinkedDebtUserService],
})
export class LinkedDebtUserModule {}
