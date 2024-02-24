import { PartialType } from '@nestjs/swagger';
import { ProdutoPost } from './produto.post';

export class ProdutoPut extends PartialType(ProdutoPost) {}
