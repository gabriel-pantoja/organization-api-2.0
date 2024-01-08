import { Grupo } from 'src/database/entities/grupo.entity';
import { VinculoUsuarioGrupoDto } from 'src/modules/vinculo-usuario-grupo/dto/vinculo-usuario-grupo.dto';

export class GrupoDto {
  id: number;
  nome: string;
  vinculoUsuarioGrupo: VinculoUsuarioGrupoDto[] = [];
  criadoEm: Date;

  static listar(data: Grupo): GrupoDto {
    const dto = new GrupoDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.vinculoUsuarioGrupo = data.vinculoUsuarioGrupo.map((x) => {
      return VinculoUsuarioGrupoDto.listar(x);
    });
    dto.criadoEm = data.criadoEm;

    return dto;
  }
}
