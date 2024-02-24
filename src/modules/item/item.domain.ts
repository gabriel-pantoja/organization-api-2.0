import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemDto } from './dto/item.dto';
import { Request } from 'express';
import { ItemService } from './item.service';
import { ItemPut } from './request/item.put';
import { ItemPost } from './request/item.post';

@Injectable()
export class ItemDomain {
  constructor(private readonly itemService: ItemService) {}

  async criar(body: ItemPost) {
    const debito = await this.itemService.criar(body);
    return debito;
  }

  async listar(request: Request) {
    return (await this.itemService.listar(request)).map((x) => {
      return ItemDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return ItemDto.listar(await this.itemService.obterPorId(+id));
  }

  async editar(id: number, body: ItemPut) {
    return this.itemService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.itemService.deletar(id);
  }
}
