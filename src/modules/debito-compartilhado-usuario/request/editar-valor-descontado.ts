import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class EditarValorDescontadoPut {
  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valorDescontado: number;
}
