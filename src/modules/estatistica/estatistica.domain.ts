import { Injectable, NotFoundException } from '@nestjs/common';
import { EstatisticaDto } from './dto/estatistica.dto';
import { VinculoCompraProdutoService } from '../vinculo-compra-produto/vinculo-compra-produto.service';

@Injectable()
export class EstatisticaDomain {
  constructor(
    private readonly vinculoCompraProdutoService: VinculoCompraProdutoService,
  ) {}

  async listaPrecoPorIdProduto(idProduto: number) {
    return (
      await this.vinculoCompraProdutoService.listaPrecoPorIdProduto(idProduto)
    ).map((x) => {
      return EstatisticaDto.listaPrecoPorIdProduto(x);
    });
  }
}
