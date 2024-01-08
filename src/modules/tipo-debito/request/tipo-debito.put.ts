import { PartialType } from '@nestjs/swagger';
import { TipoDebitoPost } from './tipo-debito.post';

export class TipoDebitoPut extends PartialType(TipoDebitoPost) {}
