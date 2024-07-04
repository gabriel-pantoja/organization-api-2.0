import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PagarPut {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  formaPagamentoId: number;

  @ApiProperty({ example: '1', nullable: true })
  localPagamentoId: number;

  @ApiProperty({ example: '1', nullable: true })
  bancoId: number;

  @ApiProperty({ example: true })
  juros: boolean;

  @ApiProperty({ example: '100' })
  valorJuros: number;
}
