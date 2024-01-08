import { PartialType } from '@nestjs/swagger';
import { VinculoDebitoUsuarioPost } from './vinculo-debito-usuario.post';

export class VinculoDebitoUsuarioPut extends PartialType(
  VinculoDebitoUsuarioPost,
) {}
