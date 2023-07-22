import { Injectable } from '@nestjs/common';
import { CreateFinancialControlDto } from '../dtos/financial-control/create-financial-control.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialControl } from 'src/data/entities/financial-control.entity';
import { Request } from 'express';

@Injectable()
export class FinancialControlService {
  constructor(
    @InjectRepository(FinancialControl)
    private repository: Repository<FinancialControl>,
  ) {}

  create(createFinancialControlDto: CreateFinancialControlDto) {
    const financialControl = this.repository.create(createFinancialControlDto);
    return this.repository.save(financialControl);
  }

  async findAll(request: Request): Promise<FinancialControl[]> {
    return this.repository.find({
      where: request.query,
    });
  }
}
