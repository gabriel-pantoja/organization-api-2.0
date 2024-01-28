import { PartialType } from '@nestjs/mapped-types';
import { PessoaPlanoPost } from './pessoa-plano.post';

export class PessoaPlanoPut extends PartialType(PessoaPlanoPost) {}
