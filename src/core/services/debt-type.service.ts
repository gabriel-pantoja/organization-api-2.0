import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtTypeDto } from '../dtos/debt-type/create-debt-type.dto';
import { UpdateDebtTypeDto } from '../dtos/debt-type/update-debt-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebtType } from 'src/data/entities/debt-type.entity';

@Injectable()
export class DebtTypeService {
  constructor(
    @InjectRepository(DebtType)
    private repository: Repository<DebtType>,
  ) {}

  create(createDebtTypeDto: CreateDebtTypeDto) {
    createDebtTypeDto.name = createDebtTypeDto.name.toUpperCase();
    const debtType = this.repository.create(createDebtTypeDto);
    return this.repository.save(debtType);
  }

  findAll(): Promise<DebtType[]> {
    return this.repository.find();
  }

  findAllSelection(): Promise<DebtType[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<DebtType> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateDebtTypeDto: UpdateDebtTypeDto) {
    const debtType = await this.repository.preload({
      id: id,
      ...updateDebtTypeDto,
    });
    if (!debtType) {
      throw new NotFoundException(`DebtType ${id} not found`);
    }
    return this.repository.save(debtType);
  }

  async remove(id: number) {
    const debtType = await this.findById(id);
    if (!debtType) {
      throw new NotFoundException(`DebtType ${id} not found`);
    }
    return this.repository.remove(debtType);
  }
}
