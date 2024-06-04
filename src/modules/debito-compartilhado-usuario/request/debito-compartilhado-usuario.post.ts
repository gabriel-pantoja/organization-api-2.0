import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class DebitoCompartilhadoUsuarioPost {
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  debitoCompartilhadoId: number;

  @ApiProperty({ example: null })
  @IsBoolean()
  pago: boolean;
}
