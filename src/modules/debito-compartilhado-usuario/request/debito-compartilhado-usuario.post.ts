import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class DebitoCompartilhadoUsuarioPost {
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  debitoCompartilhadoId: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valor: number;
  
  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  valorDescontado: number;
  
  @ApiProperty({ example: null })
  @IsBoolean()
  pago: boolean;
}
