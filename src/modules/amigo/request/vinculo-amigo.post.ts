import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VinculoAmigoPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  amigoId: number;
}
