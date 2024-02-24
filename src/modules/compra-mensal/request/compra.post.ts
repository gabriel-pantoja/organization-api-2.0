import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProdutoPost } from 'src/modules/produto/request/produto.post';

export class CompraPost {
  @ApiProperty({ example: 'Lista' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: 'Produtos' })
  @ArrayMinSize(1)
  @IsArray()
  produto: ProdutoPost[];
}
