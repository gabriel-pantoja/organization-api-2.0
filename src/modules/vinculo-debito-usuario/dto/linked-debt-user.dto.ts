import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { UsuarioDto } from '../../usuario/dto/usuario.dto';

export class VinculoDebitoUsuarioDto {
  id: number;
  usuarioId: number;
  usuario: UsuarioDto;
  debitoId: number;
  pago: boolean;

  static listar(data: VinculoDebitoUsuario): VinculoDebitoUsuarioDto {
    const dto = new VinculoDebitoUsuarioDto();

    dto.id = data.id;
    dto.usuarioId = data.usuarioId;
    dto.usuario = data.usuario;
    dto.debitoId = data.debitoId;
    dto.pago = data.pago;
    return dto;
  }
}
