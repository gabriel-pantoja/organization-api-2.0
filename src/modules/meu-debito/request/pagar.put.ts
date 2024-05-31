import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PagarPut {
  @ApiProperty({ example: true })
  juros: boolean;

  @ApiProperty({ example: '100' })
  valorJuros: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  formaPagamentoId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  cartaoId: number;
}
