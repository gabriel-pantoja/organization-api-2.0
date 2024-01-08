import { VinculoAmigo } from "src/database/entities/vinculo-amigo.entity";
import { UsuarioDto } from "src/modules/usuario/dto/usuario.dto";

export class VinculoAmigoDto {
  id: number;
  usuarioId: number;
  amigoId: number;
  status: number;
  usuario: UsuarioDto;
  amigo: UsuarioDto;

  static listar(data: VinculoAmigo): VinculoAmigoDto {
    const dto = new VinculoAmigoDto();

    if (data) {
      dto.id = data.id;
      dto.usuarioId = data.usuarioId;
      dto.amigoId = data.amigoId;
      dto.status = data.status;
      dto.amigo = new UsuarioDto();
      dto.amigo.id = data.amigo.id;
      dto.amigo.nome = data.amigo.nome;
      dto.amigo.sobrenome = data.amigo.sobrenome;
      dto.amigo.email = data.amigo.email;
      dto.usuario = new UsuarioDto();
      dto.usuario.id = data.usuario.id;
      dto.usuario.nome = data.usuario.nome;
      dto.usuario.sobrenome = data.usuario.sobrenome;
      dto.usuario.email = data.usuario.email;
    }

    return dto;
  }
}
