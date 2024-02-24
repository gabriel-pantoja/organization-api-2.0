import { Produto } from 'src/database/entities/produto.entity';

export class ProdutoDto {
  id: number;
  itemId: number;
  item: string;
  preco: number;
  unidadePeso: number;
  comprarId: number;

  static listar(data: Produto): ProdutoDto {
    const dto = new ProdutoDto();

    dto.id = data.id;
    dto.itemId = data.itemId;
    dto.item = `${data.item.nome} - ${data.item.marca}`;
    dto.preco = data.preco;
    dto.unidadePeso = data.unidadePeso;
    dto.comprarId = data.compraId;

    return dto;
  }
}
