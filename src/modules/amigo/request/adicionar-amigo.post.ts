import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import validator from 'validator';

export class AdicionarAmigoPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  amigoId: number;
}
