import { Module } from '@nestjs/common';
import { DebitoCompartilhadoUsuarioService } from './debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuarioController } from './debito-compartilhado-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoUsuarioDomain } from './debito-compartilhado-usuario.domain';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebitoCompartilhadoUsuario])],
  controllers: [DebitoCompartilhadoUsuarioController],
  providers: [
    DebitoCompartilhadoUsuarioService,
    DebitoCompartilhadoUsuarioDomain,
  ],
})
export class DebitoCompartilhadoUsuarioModule {}
