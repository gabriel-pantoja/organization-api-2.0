import { Produto } from 'src/database/entities/produto.entity';

export class ProdutoDto {
  id: number;
  nome: string;
  marca: string;

  static listar(data: Produto): ProdutoDto {
    const dto = new ProdutoDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.marca = data.marca;

    return dto;
  }
}
