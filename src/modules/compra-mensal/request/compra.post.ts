import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { VinculoCompraProdutoPost } from 'src/modules/vinculo-compra-produto/request/vinculo-compra-produto.post';

export class CompraPost {
  @ApiProperty({ example: 'Lista' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: 'Produtos Vinculados' })
  @ArrayMinSize(1)
  @IsArray()
  vinculoCompraProduto: VinculoCompraProdutoPost[];
}
