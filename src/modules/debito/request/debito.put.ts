import { PartialType } from '@nestjs/swagger';
import { DebitoPost } from './debito.post';

export class DebitoPut extends PartialType(DebitoPost) {}
