import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoDebitoPost } from './request/tipo-debito.post';
import { TipoDebitoPut } from './request/tipo-debito.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { TipoDebito } from 'src/database/entities/tipo-debito.entity';

@Injectable()
export class TipoDebitoService {
  constructor(
    @InjectRepository(TipoDebito)
    private repository: Repository<TipoDebito>,
  ) {}

  async criar(body: TipoDebitoPost) {
    body.nome = body.nome.toUpperCase();
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<TipoDebito[]> {
    return await this.repository.find({ where: request.query });
  }

  async obterPorId(id: number): Promise<TipoDebito> {
    return await this.repository.findOne({ where: { id } });
  }

  async editar(id: number, body: TipoDebitoPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`DebtType ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`DebtType ${id} not found`);
    }
    return await this.repository.remove(data);
  }
}
