import { PartialType } from '@nestjs/swagger';
import { DebitoCompartilhadoPost } from './debito-compartilhado.post';

export class DebitoCompartilhadoPut extends PartialType(
  DebitoCompartilhadoPost,
) {}
