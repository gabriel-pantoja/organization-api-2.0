import { Injectable, NotFoundException } from '@nestjs/common';
import { CompraDto } from './dto/compra.dto';
import { Request } from 'express';
import { CompraService } from './compra.service';
import { CompraPut } from './request/compra.put';
import { CompraPost } from './request/compra.post';

@Injectable()
export class CompraDomain {
  constructor(private readonly compraService: CompraService) {}

  async criar(body: CompraPost) {
    const data = await this.compraService.criar(body);
    return data;
  }

  async listar(request: Request) {
    return (await this.compraService.listar(request)).map((x) => {
      return CompraDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return CompraDto.obter(await this.compraService.obterPorId(+id));
  }

  async editar(id: number, body: CompraPut) {
    return this.compraService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.compraService.deletar(id);
  }
}
