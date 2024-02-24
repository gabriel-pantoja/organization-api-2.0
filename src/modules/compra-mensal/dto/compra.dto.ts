import { Compra } from 'src/database/entities/compra.entity';
import { ProdutoDto } from 'src/modules/produto/dto/produto.dto';

export class CompraDto {
  id: number;
  nome: string;
  usuarioId: number;
  produto: ProdutoDto[] = [];

  static listar(data: Compra): CompraDto {
    const dto = new CompraDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.usuarioId = data.usuarioId;

    return dto;
  }

  static obter(data: Compra): CompraDto {
    const dto = new CompraDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.usuarioId = data.usuarioId;
    dto.produto = data.produto.map((x) => {
      return ProdutoDto.listar(x);
    });

    return dto;
  }
}
