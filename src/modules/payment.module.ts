import { Module } from '@nestjs/common';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentDomanin } from 'src/core/domain/payment.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedDebtUserService } from 'src/core/services/linked-debt-user.service';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { PaymentService } from 'src/core/services/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkedDebtUser])],
  controllers: [PaymentController],
  providers: [PaymentDomanin, PaymentService, LinkedDebtUserService],
})
export class PaymentModule {}
