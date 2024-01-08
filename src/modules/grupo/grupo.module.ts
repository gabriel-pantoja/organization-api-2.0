import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GroupController } from './grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoUsuarioGrupoService } from 'src/modules/vinculo-usuario-grupo/vinculo-usuario-grupo.service';
import { Grupo } from 'src/database/entities/grupo.entity';
import { VinculoUsuarioGrupo } from 'src/database/entities/vinculo-usuario-grupo.entity';
import { GrupoDomain } from './grupo.domain';
import { VinculoUsuarioGrupoDomain } from '../vinculo-usuario-grupo/vinculo-usuario-grupo.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Grupo, VinculoUsuarioGrupo])],
  controllers: [GroupController],
  providers: [
    GrupoService,
    VinculoUsuarioGrupoService,
    GrupoDomain,
    VinculoUsuarioGrupoDomain,
  ],
})
export class GrupoModule {}
