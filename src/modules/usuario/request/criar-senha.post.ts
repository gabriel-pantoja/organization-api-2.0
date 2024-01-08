import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarSenhaPost {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
