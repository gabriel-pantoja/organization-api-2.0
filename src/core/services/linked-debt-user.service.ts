import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkedDebtUserDto } from '../dtos/linked-debt-user/create-linked-debt-user.dto';
import { UpdateLinkedDebtUserDto } from '../dtos/linked-debt-user/update-linked-debt-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkedDebtUserService {
  constructor(
    @InjectRepository(LinkedDebtUser)
    private repository: Repository<LinkedDebtUser>,
  ) {}

  create(createLinkedDebtUserDto: CreateLinkedDebtUserDto) {
    const linkedDebtUser = this.repository.create(createLinkedDebtUserDto);
    return this.repository.save(linkedDebtUser);
  }

  findAll(): Promise<LinkedDebtUser[]> {
    return this.repository.find({
      relations: {
        user: true,
        debt: true,
      },
    });
  }

  findById(id: number): Promise<LinkedDebtUser> {
    return this.repository.findOne({
      relations: {
        user: true,
        debt: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateLinkedDebtUserDto: UpdateLinkedDebtUserDto) {
    const linkedDebtUser = await this.repository.preload({
      id: id,
      ...updateLinkedDebtUserDto,
    });
    if (!linkedDebtUser) {
      throw new NotFoundException(`LinkedDebtUser ${id} not found`);
    }
    return this.repository.save(linkedDebtUser);
  }

  async remove(id: number) {
    const debt = await this.findById(id);
    if (!debt) {
      throw new NotFoundException(`LinkedDebtUser ${id} not found`);
    }
    return this.repository.remove(debt);
  }
}
