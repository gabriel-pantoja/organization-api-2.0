import { ApiProperty } from '@nestjs/swagger';
import { VinculoDebitoUsuarioDto } from '../../vinculo-debito-usuario/dto/vinculo-debito-usuario.dto';
import { UsuarioDto } from '../../usuario/dto/usuario.dto';
import { Debito } from 'src/database/entities/debito.entity';

export class DebitoDto {
  id: number;
  categoriaId: number;
  categoriaNome: string;
  nome: string;
  responsavelId: number;
  responsavel: UsuarioDto;
  valor: number;
  vencimento: Date;
  referenteMesAno: string;
  pago: boolean;
  vinculoDebitoUsuario: VinculoDebitoUsuarioDto[] = [];
  criadoEm: Date;

  static listar(data: Debito): DebitoDto {
    const dto = new DebitoDto();

    dto.id = data.id;
    dto.categoriaId = data.categoriaId;
    dto.categoriaNome = data.categoria.nome;
    dto.nome = data.nome;
    dto.responsavelId = data.responsavelId;
    dto.responsavel = data.responsavel;
    dto.valor = data.valor;
    dto.vencimento = data.vencimento;
    dto.referenteMesAno = data.referenteMesAno;
    dto.pago = data.pago;
    dto.vinculoDebitoUsuario = data.vinculoDebitoUsuario.map((x) => {
      return VinculoDebitoUsuarioDto.listar(x);
    });
    dto.criadoEm = data.criadoEm;

    return dto;
  }
}
