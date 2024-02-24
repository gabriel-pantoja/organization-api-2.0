import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ProdutoPost } from './request/produto.post';
import { ProdutoPut } from './request/produto.put';
import { Produto } from 'src/database/entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private repository: Repository<Produto>,
  ) {}

  async criar(body: ProdutoPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<Produto[]> {
    return this.repository.find({
      where: request.query,
    });
  }

  async obterPorId(id: number): Promise<Produto> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async editar(id: number, body: ProdutoPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`Produto ${id} not found`);
    }
    return this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`Produto ${id} not found`);
    }
    return this.repository.remove(data);
  }
}
