import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoService } from '../debito-compartilhado/debito-compartilhado.service';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioController } from './debito-compartilhado-usuario.controller';
import { DebitoCompartilhadoUsuarioService } from './debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuarioDomain } from './debito-compartilhado-usuario.domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebitoCompartilhadoUsuario, DebitoCompartilhado]),
  ],
  controllers: [DebitoCompartilhadoUsuarioController],
  providers: [
    DebitoCompartilhadoUsuarioService,
    DebitoCompartilhadoUsuarioDomain,
    DebitoCompartilhadoService,
  ],
})
export class DebitoCompartilhadoUsuarioModule {}
