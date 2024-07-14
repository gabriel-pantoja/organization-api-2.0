import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UsuarioVinculadoDebitoProporcionalPost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioVinculadoId: number;
}
