import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProdutoPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  unidadePeso: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  preco: number;
}
