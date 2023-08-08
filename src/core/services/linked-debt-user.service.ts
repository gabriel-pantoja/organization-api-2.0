import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkedDebtUserDto } from '../dtos/linked-debt-user/create-linked-debt-user.dto';
import { UpdateLinkedDebtUserDto } from '../dtos/linked-debt-user/update-linked-debt-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

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

  findAllByDebtId(debtId: number): Promise<LinkedDebtUser[]> {
    return this.repository.find({
      select: {
        debt: {
          id: true,
          name: true,
          userId: true,
          user: {
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
        debt: { user: true, linkedDebtUser: { user: true } },
      },
      where: {
        debtId,
      },
    });
  }

  findAll(request: Request): Promise<LinkedDebtUser[]> {
    return this.repository.find({
      select: {
        debt: {
          id: true,
          name: true,
          userId: true,
          user: {
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
        debt: { user: true, linkedDebtUser: { user: true } },
      },
      where: {
        userId: Number(request.query.userId),
        debt: { dateMonthAndYear: request.query.dateMonthAndYear.toString() },
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

  findByUserId(userId: number): Promise<LinkedDebtUser | null> {
    return this.repository.findOne({
      where: { userId },
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

  async removeByUserId(userId: number) {
    const linkedDebtUser = await this.repository.findOneBy({ userId: userId });
    if (!linkedDebtUser) {
      throw new NotFoundException(`User Group By User ${userId} not found`);
    }
    return this.repository.remove(linkedDebtUser);
  }
}
