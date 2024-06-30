import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { UsuarioDto } from '../../usuario/dto/usuario.dto';
import { DebitoCompartilhadoDto } from 'src/modules/debito-compartilhado/dto/debito-compartilhado.dto';

export class DebitoCompartilhadoUsuarioDto {
  id: number;
  usuarioId: number;
  usuario: UsuarioDto;
  debitoCompartilhadoId: number;
  debitoCompartilhado: DebitoCompartilhadoDto;
  valor: number;
  valorDescontado: number;
  pago: boolean;

  static listar(
    data: DebitoCompartilhadoUsuario,
  ): DebitoCompartilhadoUsuarioDto {
    const dto = new DebitoCompartilhadoUsuarioDto();

    dto.id = data.id;
    dto.usuarioId = data.usuarioId;
    dto.usuario = UsuarioDto.listarDto(data.usuario);
    dto.debitoCompartilhadoId = data.debitoCompartilhadoId;
    dto.valor = data.valor;
    dto.valorDescontado = data.valorDescontado;
    dto.pago = data.pago;
    return dto;
  }
}
