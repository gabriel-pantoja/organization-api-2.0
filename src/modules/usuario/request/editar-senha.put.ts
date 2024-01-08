import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditarSenhaPut {
  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
