import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtDto } from '../dtos/debt/create-debt.dto';
import { UpdateDebtDto } from '../dtos/debt/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from 'src/data/entities/debt.entity';
import { Request } from 'express';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private repository: Repository<Debt>,
  ) {}

  create(createDebtDto: CreateDebtDto) {
    createDebtDto.name = createDebtDto.name.toUpperCase();
    createDebtDto.isPay = false;
    const debt = this.repository.create(createDebtDto);
    return this.repository.save(debt);
  }

  async findAll(request: Request): Promise<Debt[]> {
    return this.repository.find({
      relations: {
        debtType: true,
        user: true,
        linkedDebtUser: { user: true, debt: true },
      },
      where: request.query,
    });
  }

  findById(id: number): Promise<Debt> {
    return this.repository.findOne({
      relations: {
        debtType: true,
        user: true,
        linkedDebtUser: { user: true, debt: true },
      },
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
