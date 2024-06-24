import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  isEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import validator from 'validator';
import { DebitoCompartilhadoUsuarioPost } from 'src/modules/debito-compartilhado-usuario/request/debito-compartilhado-usuario.post';

export class DebitoCompartilhadoPost {
  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  nome: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  responsavelId: number;

  @ApiProperty({ example: 'Responsável' })
  responsavelNome: string;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valor: number;

  @ApiProperty({ example: '2023-04-27' })
  vencimento: Date;

  @ApiProperty({ example: '04-2023' })
  referenteMesAno: string;

  @ApiProperty({ example: 'Usuários Vinculados' })
  @ArrayMinSize(1)
  @IsArray()
  debitoCompartilhadoUsuario: DebitoCompartilhadoUsuarioPost[];

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  criadoPorUsuarioId: number;
}
