import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { UsuarioDto } from '../../usuario/dto/usuario.dto';

export class DebitoCompartilhadoUsuarioDto {
  id: number;
  usuarioId: number;
  usuario: UsuarioDto;
  debitoCompartilhadoId: number;
  pago: boolean;

  static listar(
    data: DebitoCompartilhadoUsuario,
  ): DebitoCompartilhadoUsuarioDto {
    const dto = new DebitoCompartilhadoUsuarioDto();

    dto.id = data.id;
    dto.usuarioId = data.usuarioId;
    dto.usuario = data.usuario;
    dto.debitoCompartilhadoId = data.debitoCompartilhadoId;
    dto.pago = data.pago;
    return dto;
  }
}
