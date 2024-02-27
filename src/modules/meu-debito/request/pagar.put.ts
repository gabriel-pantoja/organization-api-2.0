import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import validator from 'validator';

export class PagarPut {
  @ApiProperty({ example: true })
  juros: boolean;

  @ApiProperty({ example: '100' })
  valorJuros: number;

  @ApiProperty({ example: 'Nubank' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  localPagamento: string;
}
