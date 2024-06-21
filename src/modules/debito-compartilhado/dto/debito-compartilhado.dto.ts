import { ApiProperty } from '@nestjs/swagger';
import { UsuarioDto } from '../../usuario/dto/usuario.dto';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';
import { DebitoCompartilhadoUsuarioDto } from 'src/modules/debito-compartilhado-usuario/dto/debito-compartilhado-usuario.dto';

export class DebitoCompartilhadoDto {
  id: number;
  categoriaId: number;
  categoriaNome: string;
  nome: string;
  responsavelId: number;
  responsavel: UsuarioDto;
  valor: number;
  valorDivido: number;
  totalUsuario: number;
  vencimento: Date;
  referenteMesAno: string;
  pago: boolean;
  debitoCompartilhadoUsuario: DebitoCompartilhadoUsuarioDto[] = [];

  criadoEm: Date;

  static listar(data: DebitoCompartilhado): DebitoCompartilhadoDto {
    const dto = new DebitoCompartilhadoDto();

    dto.id = data.id;
    dto.categoriaId = data.categoriaId;
    dto.categoriaNome = data.categoria.nome;
    dto.nome = data.nome;
    dto.responsavelId = data.responsavelId;
    dto.responsavel = data.responsavel;
    dto.valor = data.valor;
    dto.valorDivido = data.valor / data.debitoCompartilhadoUsuario.length;
    dto.totalUsuario = data.debitoCompartilhadoUsuario.length;
    dto.vencimento = data.vencimento;
    dto.referenteMesAno = data.referenteMesAno;
    dto.pago = data.pago;
    dto.debitoCompartilhadoUsuario = data.debitoCompartilhadoUsuario.map(
      (x) => {
        return DebitoCompartilhadoUsuarioDto.listar(x);
      },
    );
    dto.criadoEm = data.criadoEm;

    return dto;
  }
}
