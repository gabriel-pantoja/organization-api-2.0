import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutoDto } from './dto/produto.dto';
import { Request } from 'express';
import { ProdutoService } from './produto.service';
import { ProdutoPut } from './request/produto.put';
import { ProdutoPost } from './request/produto.post';

@Injectable()
export class ProdutoDomain {
  constructor(private readonly produtoService: ProdutoService) {}

  async criar(body: ProdutoPost) {
    const data = await this.produtoService.criar(body);
    return data;
  }

  async listar(request: Request) {
    return (await this.produtoService.listar(request)).map((x) => {
      return ProdutoDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return ProdutoDto.listar(await this.produtoService.obterPorId(+id));
  }

  async editar(id: number, body: ProdutoPut) {
    return this.produtoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.produtoService.deletar(id);
  }
}
