import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import validator from 'validator';

export class AdicionarAmigoPost {
  @ApiProperty({ example: 'null' })
  usuarioId: number;

  @ApiProperty({ example: 'pantoja@pantoja.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => validator.trim(value))
  email: string;
}
