import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import validator from 'validator';

export class DebitoProporcionalUsuarioPost {
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
  
  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  salario: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;
}
