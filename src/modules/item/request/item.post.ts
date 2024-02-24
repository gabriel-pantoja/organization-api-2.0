import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import validator from 'validator';

export class ItemPost {
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
