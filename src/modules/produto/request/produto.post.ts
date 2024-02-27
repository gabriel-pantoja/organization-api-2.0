import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import validator from 'validator';

export class ProdutoPost {
  @ApiProperty({ example: 'Leite' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  nome: string;

  @ApiProperty({ example: 'Moça' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  marca: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;
}
