import { PartialType } from '@nestjs/swagger';
import { VinculoCompraProdutoPost } from './vinculo-compra-produto.post';

export class VinculoCompraProdutoPut extends PartialType(
  VinculoCompraProdutoPost,
) {}
