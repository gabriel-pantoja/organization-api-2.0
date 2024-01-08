import { PartialType } from '@nestjs/swagger';
import { VinculoUsuarioGrupoPost } from './vinculo-usuario-grupo.post';

export class VinculoUsuarioGrupoPut extends PartialType(
  VinculoUsuarioGrupoPost,
) {}
