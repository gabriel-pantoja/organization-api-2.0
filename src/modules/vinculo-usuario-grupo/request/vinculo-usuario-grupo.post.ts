import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class VinculoUsuarioGrupoPost {
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  grupoId: number;
}
