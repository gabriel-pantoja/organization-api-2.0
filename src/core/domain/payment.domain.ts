import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { PaymentService } from '../services/payment.service';

@Injectable()
export class PaymentDomanin {
  constructor(private paymentService: PaymentService) {}

  findAll(request: Request): Promise<LinkedDebtUser[]> {
    return this.paymentService.findAll(request);
  }
}
