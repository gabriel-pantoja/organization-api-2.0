import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(LinkedDebtUser)
    private repository: Repository<LinkedDebtUser>,
  ) {}

  findAll(request: Request): Promise<LinkedDebtUser[]> {
    return this.repository.find({
      select: {
        debt: {
          id: true,
          name: true,
          responsibleId: true,
          responsible: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
          price: true,
          payDate: true,
          dateMonthAndYear: true,
          isPay: true,
          linkedDebtUser: {
            id: true,
            userId: true,
            debtId: true,
            isPay: true,
            user: { id: true, firstName: true, lastName: true, email: true },
          },
        },
      },
      relations: {
        debt: { responsible: true, linkedDebtUser: { user: true } },
      },
      where: {
        userId: Number(request.query.userId),
        debt: { dateMonthAndYear: request.query.dateMonthAndYear.toString() },
      },
    });
  }
}
