import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import validator from 'validator';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';

export class DebitoPost {
  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  nome: string;

  // @ApiProperty({ example: '1' })
  // @IsNumber()
  // @IsNotEmpty()
  // tipoDebitoId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  responsavelId: number;

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

  @ApiProperty({ example: null })
  // @IsBoolean()
  pago: boolean;

  @ApiProperty({ example: 'Usuários' })
  @IsArray()
  vinculoDebitoUsuario: VinculoDebitoUsuario[];

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  criadoPorUsuarioId: number;
}
