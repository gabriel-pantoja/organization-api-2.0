import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LinkedDebtUserService } from '../services/linked-debt-user.service';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';

@Injectable()
export class PaymentDomanin {
  constructor(private linkedDebtUser: LinkedDebtUserService) {}

  findAll(request: Request): Promise<LinkedDebtUser[]> {
    return this.linkedDebtUser.findAll(request);
  }
}
