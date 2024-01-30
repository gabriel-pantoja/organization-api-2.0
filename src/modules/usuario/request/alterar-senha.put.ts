import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AlterarSenhaPut {
  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
