import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import validator from 'validator';

export class UsuarioPut {
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
  @IsEmail()
  @Transform(({ value }) => validator.trim(value))
  email: string;

  @ApiProperty({ example: '100' })
  salario: number;

  @ApiProperty({ example: 'null' })
  usuarioId: number;
}
