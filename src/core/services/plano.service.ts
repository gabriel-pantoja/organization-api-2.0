import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plano } from 'src/database/entities/plano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanoService {
  constructor(
    @InjectRepository(Plano)
    private repository: Repository<Plano>,
  ) {}

  obterPorId(id: number): Promise<Plano> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
