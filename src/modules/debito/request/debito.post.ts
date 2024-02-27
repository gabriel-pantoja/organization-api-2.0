import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import validator from 'validator';
import { VinculoDebitoUsuarioPost } from 'src/modules/vinculo-debito-usuario/request/vinculo-debito-usuario.post';

export class DebitoPost {
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
  @IsNotEmpty()
  vencimento: Date;

  @ApiProperty({ example: '04-2023' })
  @IsString()
  @IsNotEmpty()
  referenteMesAno: string;

  @ApiProperty({ example: 'Usuários Vinculados' })
  @ArrayMinSize(1)
  @IsArray()
  vinculoDebitoUsuario: VinculoDebitoUsuarioPost[];

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  criadoPorUsuarioId: number;
}
