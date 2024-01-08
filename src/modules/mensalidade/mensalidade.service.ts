import { Injectable } from '@nestjs/common';
import { MensalidadePost } from './request/mensalidade.post';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';

@Injectable()
export class MensalidadeService {
  constructor(
    @InjectRepository(Mensalidade)
    private repository: Repository<Mensalidade>,
  ) {}

  async criar(body: MensalidadePost) {
    const mensalidade = this.repository.create(body);
    return await this.repository.save(mensalidade);
  }

  async listar(request: Request): Promise<Mensalidade[]> {
    return await this.repository.find({
      where: request.query,
    });
  }
}
