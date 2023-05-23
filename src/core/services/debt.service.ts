import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtDto } from '../dtos/debt/create-debt.dto';
import { UpdateDebtDto } from '../dtos/debt/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from 'src/data/entities/debt.entity';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private repository: Repository<Debt>,
  ) {}

  create(createDebtDto: CreateDebtDto) {
    const debt = this.repository.create(createDebtDto);
    return this.repository.save(debt);
  }

  findAll(): Promise<Debt[]> {
    return this.repository.find({
      select: {
        id: true,
        debtType: { name: true },
        price: true,
        payDate: true,
        dateMonthAndYear: true,
        isPay: true,
        createdAt: true,
      },
      relations: { debtType: true, user: true },
    });
  }

  findById(id: number): Promise<Debt> {
    return this.repository.findOne({
      select: {
        id: true,
        debtType: { name: true },
        price: true,
        payDate: true,
        dateMonthAndYear: true,
        isPay: true,
        createdAt: true,
      },
      relations: { debtType: true, user: true },
      where: { id },
    });
  }

  async update(id: number, updateDebtDto: UpdateDebtDto) {
    const debt = await this.repository.preload({
      id: id,
      ...updateDebtDto,
    });
    if (!debt) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.save(debt);
  }

  async remove(id: number) {
    const debt = await this.findById(id);
    if (!debt) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.remove(debt);
  }
}
