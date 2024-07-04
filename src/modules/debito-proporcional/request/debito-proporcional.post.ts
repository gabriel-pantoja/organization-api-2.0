import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import validator from 'validator';

export class DebitoProporcionalPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  tipoDebitoId: number;

  @ApiProperty({ example: 'Leite' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  nome: string;

  @ApiProperty({ example: 'Leite' })
  descricao: string;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valor: number;

  @ApiProperty({ example: '2023-04-27' })
  @IsNotEmpty()
  vencimento: Date;

  @ApiProperty({ example: '04-2023' })
  @IsString()
  @IsNotEmpty()
  referenteMesAno: string;

  @ApiProperty({ example: false })
  debitoRecorrente: boolean;

  @ApiProperty({ example: '3' })
  parcelas: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  debitoParceladoId: number;
}
