import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';

export class VinculoCompraProdutoDto {
  id: number;
  compraId: number;
  produtoId: number;
  produto: string;
  unidade: number;
  preco: number;

  static listar(data: VinculoCompraProduto): VinculoCompraProdutoDto {
    const dto = new VinculoCompraProdutoDto();

    dto.id = data.id;
    dto.compraId = data.compraId;
    dto.produtoId = data.produtoId;
    dto.produto = `${data.produto.nome} - ${data.produto.marca}`;
    dto.unidade = data.unidade;
    dto.preco = data.preco;

    return dto;
  }
}
