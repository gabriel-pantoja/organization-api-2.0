import { PartialType } from '@nestjs/swagger';
import { DebitoProporcionalPost } from './debito-proporcional.post';

export class DebitoProporcionalPut extends PartialType(
  DebitoProporcionalPost,
) {}
