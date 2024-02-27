import { Injectable, NotFoundException } from '@nestjs/common';
import { VinculoCompraProdutoDto } from './dto/vinculo-compra-produto.dto';
import { Request } from 'express';
import { VinculoCompraProdutoService } from './vinculo-compra-produto.service';
import { VinculoCompraProdutoPut } from './request/vinculo-compra-produto.put';
import { VinculoCompraProdutoPost } from './request/vinculo-compra-produto.post';

@Injectable()
export class VinculoCompraProdutoDomain {
  constructor(
    private readonly vinculoCompraProdutoService: VinculoCompraProdutoService,
  ) {}

  async criar(body: VinculoCompraProdutoPost) {
    const data = await this.vinculoCompraProdutoService.criar(body);
    return data;
  }

  async listar(request: Request) {
    return (await this.vinculoCompraProdutoService.listar(request)).map((x) => {
      return VinculoCompraProdutoDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return VinculoCompraProdutoDto.listar(
      await this.vinculoCompraProdutoService.obterPorId(+id),
    );
  }

  async editar(id: number, body: VinculoCompraProdutoPut) {
    return this.vinculoCompraProdutoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.vinculoCompraProdutoService.deletar(id);
  }
}
