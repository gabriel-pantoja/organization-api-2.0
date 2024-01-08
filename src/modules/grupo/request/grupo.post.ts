import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { VinculoUsuarioGrupo } from 'src/database/entities/vinculo-usuario-grupo.entity';

export class GrupoPost {
  @ApiProperty({ example: 'Apto' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Usuários' })
  @IsArray()
  vinculoUsuarioGrupo: VinculoUsuarioGrupo[];
}
