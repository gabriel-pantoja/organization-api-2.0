import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RedefinirSenhaPost {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
