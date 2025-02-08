import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EPlano } from 'src/core/enums/plano.enum';
import validator from 'validator';

export class NovoUsuarioPost {
  @ApiProperty({ example: 'Gabriel' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  nome: string;

  @ApiProperty({ example: 'Pantoja' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  sobrenome: string;

  @ApiProperty({ example: 'pantoja@pantoja.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: (args) => `E-mail '${args.value}' não é válido.` })
  @Transform(({ value }) => validator.trim(value))
  email: string;

  @ApiProperty({ enum: EPlano })
  planoId: EPlano;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formaPagamento: string;
}
