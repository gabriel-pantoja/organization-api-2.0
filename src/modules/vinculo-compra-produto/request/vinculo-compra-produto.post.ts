import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VinculoCompraProdutoPost {
  @ApiProperty({ example: 1 })
  @IsInt()
  produtoId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  compraId: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  unidade: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  preco: number;
}
