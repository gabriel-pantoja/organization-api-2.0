import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class VinculoDebitoUsuarioPost {
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  debitoId: number;

  @ApiProperty({ example: null })
  @IsBoolean()
  pago: boolean;
}
