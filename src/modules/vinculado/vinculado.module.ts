import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoService } from 'src/core/services/plano.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Plano } from 'src/database/entities/plano.entity';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculadoController } from './vinculado.controller';
import { VinculadoDomain } from './vinculado.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Plano, Usuario, VinculoDebitoUsuario])],
  controllers: [VinculadoController],
  providers: [
    PlanoService,
    VinculadoDomain,
    UsuarioService,
    VinculoDebitoUsuarioService,
  ],
})
export class VinculadoModule {}
