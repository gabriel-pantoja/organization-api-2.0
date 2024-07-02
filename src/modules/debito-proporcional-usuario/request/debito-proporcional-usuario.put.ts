import { PartialType } from '@nestjs/swagger';
import { DebitoProporcionalUsuarioPost } from './debito-proporcional-usuario.post';

export class DebitoProporcionalUsuarioPut extends PartialType(
  DebitoProporcionalUsuarioPost,
) {}
