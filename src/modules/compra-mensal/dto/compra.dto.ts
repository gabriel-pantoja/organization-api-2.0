import { Compra } from 'src/database/entities/compra.entity';
import { VinculoCompraProdutoDto } from 'src/modules/vinculo-compra-produto/dto/vinculo-compra-produto.dto';

export class CompraDto {
  id: number;
  nome: string;
  vinculoCompraProduto: VinculoCompraProdutoDto[];
  usuarioId: number;

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
    dto.vinculoCompraProduto = data.vinculoCompraProduto.map((x) => {
      return VinculoCompraProdutoDto.listar(x);
    });
    dto.usuarioId = data.usuarioId;

    return dto;
  }
}
