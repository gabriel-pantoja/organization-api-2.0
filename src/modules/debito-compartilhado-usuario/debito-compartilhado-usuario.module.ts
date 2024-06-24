import { Module } from '@nestjs/common';
import { DebitoCompartilhadoUsuarioService } from './debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuarioController } from './debito-compartilhado-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoUsuarioDomain } from './debito-compartilhado-usuario.domain';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoService } from '../debito-compartilhado/debito-compartilhado.service';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';

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
