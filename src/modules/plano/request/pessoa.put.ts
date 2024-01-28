import { PartialType } from '@nestjs/mapped-types';
import { PessoaPost } from './pessoa.post';

export class PessoaPut extends PartialType(PessoaPost) {}
