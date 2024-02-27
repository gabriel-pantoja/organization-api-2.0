import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { VinculoCompraProdutoPost } from './request/vinculo-compra-produto.post';
import { VinculoCompraProdutoPut } from './request/vinculo-compra-produto.put';
import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';

@Injectable()
export class VinculoCompraProdutoService {
  constructor(
    @InjectRepository(VinculoCompraProduto)
    private repository: Repository<VinculoCompraProduto>,
  ) {}

  async criar(body: VinculoCompraProdutoPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<VinculoCompraProduto[]> {
    return this.repository.find({
      where: request.query,
    });
  }

  async obterPorId(id: number): Promise<VinculoCompraProduto> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async editar(id: number, body: VinculoCompraProdutoPut) {
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
