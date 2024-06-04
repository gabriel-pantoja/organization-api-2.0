import { PartialType } from '@nestjs/swagger';
import { DebitoCompartilhadoUsuarioPost } from './debito-compartilhado-usuario.post';

export class DebitoCompartilhadoUsuarioPut extends PartialType(
  DebitoCompartilhadoUsuarioPost,
) {}
