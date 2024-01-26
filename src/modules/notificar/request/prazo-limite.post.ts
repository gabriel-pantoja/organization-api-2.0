import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import validator from 'validator';

export class PrazoLimitePost {
  @ApiProperty({ example: 'pantoja@pantoja.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => validator.trim(value))
  email: string;

  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  debito: string;

  @ApiProperty({ example: 'Gabriel Pantoja' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  responsavel: string;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valor: string;

  @ApiProperty({ example: '2023-04-27' })
  @IsNotEmpty()
  vencimento: string;

  @ApiProperty({ example: '04-2023' })
  @IsString()
  @IsNotEmpty()
  referenteMesAno: string;
}
