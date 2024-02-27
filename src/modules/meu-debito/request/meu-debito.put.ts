import { PartialType } from '@nestjs/swagger';
import { MeuDebitoPost } from './meu-debito.post';

export class MeuDebitoPut extends PartialType(MeuDebitoPost) {}
