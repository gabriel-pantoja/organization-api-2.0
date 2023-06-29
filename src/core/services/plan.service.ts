import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from 'src/data/entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private repository: Repository<Plan>,
  ) {}

  findById(id: number): Promise<Plan> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
