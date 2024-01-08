import { Module } from '@nestjs/common';
import { VinculoUsuarioGrupoService } from './vinculo-usuario-grupo.service';
import { VinculoUsuarioGrupoController } from './vinculo-usuario-grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoUsuarioGrupo } from 'src/database/entities/vinculo-usuario-grupo.entity';
import { VinculoUsuarioGrupoDomain } from './vinculo-usuario-grupo.domain';

@Module({
  imports: [TypeOrmModule.forFeature([VinculoUsuarioGrupo])],
  controllers: [VinculoUsuarioGrupoController],
  providers: [VinculoUsuarioGrupoService, VinculoUsuarioGrupoDomain],
})
export class VinculoUsuarioGrupoModule {}
