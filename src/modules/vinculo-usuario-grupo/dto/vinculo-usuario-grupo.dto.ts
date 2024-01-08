import { VinculoUsuarioGrupo } from "src/database/entities/vinculo-usuario-grupo.entity";

export class VinculoUsuarioGrupoDto {
  id: number;
  usuarioId: number;
  nome: string;
  sobrenome: string;
  email: string;
  grupoId: number;

  static listar(data: VinculoUsuarioGrupo): VinculoUsuarioGrupoDto {
    const dto = new VinculoUsuarioGrupoDto();

    dto.id = data.id;
    dto.usuarioId = data.usuarioId;
    dto.nome = data.usuario.nome;
    dto.sobrenome = data.usuario.sobrenome;
    dto.email = data.usuario.email;
    dto.grupoId = data.grupoId;
    return dto;
  }
}
