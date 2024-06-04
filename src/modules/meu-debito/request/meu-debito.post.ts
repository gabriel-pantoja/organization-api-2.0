import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MeuDebitoPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  tipoDebitoId: number;

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

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;
}
