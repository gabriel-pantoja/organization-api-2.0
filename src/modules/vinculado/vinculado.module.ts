import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoService } from 'src/core/services/plano.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Plano } from 'src/database/entities/plano.entity';
import { VinculadoController } from './vinculado.controller';
import { VinculadoDomain } from './vinculado.domain';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plano, Usuario, DebitoCompartilhadoUsuario]),
  ],
  controllers: [VinculadoController],
  providers: [
    PlanoService,
    VinculadoDomain,
    UsuarioService,
    DebitoCompartilhadoUsuarioService,
  ],
})
export class VinculadoModule {}
