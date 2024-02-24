import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Item } from 'src/database/entities/item.entity';
import { ItemPost } from './request/item.post';
import { ItemPut } from './request/item.put';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private repository: Repository<Item>,
  ) {}

  async criar(body: ItemPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<Item[]> {
    return this.repository.find({
      where: request.query,
    });
  }

  async obterPorId(id: number): Promise<Item> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async editar(id: number, body: ItemPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.remove(data);
  }
}
