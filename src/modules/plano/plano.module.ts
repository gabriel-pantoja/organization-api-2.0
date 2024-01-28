import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoController } from './plano.controller';
import { PlanoService } from 'src/modules/plano/plano.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Plano } from 'src/database/entities/plano.entity';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { PlanoDomain } from './plano.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Plano, Usuario, VinculoDebitoUsuario])],
  controllers: [PlanoController],
  providers: [
    PlanoService,
    PlanoDomain,
    UsuarioService,
    VinculoDebitoUsuarioService,
  ],
})
export class PlanoModule {}
