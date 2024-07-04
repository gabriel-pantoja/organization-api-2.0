import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RendaMensalPut {
  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  salario: number;
}
