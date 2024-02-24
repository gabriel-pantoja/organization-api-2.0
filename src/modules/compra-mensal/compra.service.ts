import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Compra } from 'src/database/entities/compra.entity';
import { CompraPost } from './request/compra.post';
import { CompraPut } from './request/compra.put';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private repository: Repository<Compra>,
  ) {}

  async criar(body: CompraPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<Compra[]> {
    return this.repository.find({
      where: request.query,
    });
  }

  async obterPorId(id: number): Promise<Compra> {
    return await this.repository.findOne({
      relations: {
        produto: { item: true },
      },
      where: { id },
    });
  }

  async editar(id: number, body: CompraPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`Compra ${id} not found`);
    }
    return this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`Compra ${id} not found`);
    }
    return this.repository.remove(data);
  }
}
