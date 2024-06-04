import { Module } from '@nestjs/common';
import { DebitoCompartilhadoService } from './debito-compartilhado.service';
import { DebitoCompartilhadoController } from './debito-compartilhado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoDomain } from './debito-compartilhado.domain';
import { EmailService } from 'src/core/services/email.service';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebitoCompartilhado, DebitoCompartilhadoUsuario]),
  ],
  controllers: [DebitoCompartilhadoController],
  providers: [
    DebitoCompartilhadoService,
    DebitoCompartilhadoUsuarioService,
    DebitoCompartilhadoDomain,
    EmailService,
  ],
})
export class DebitoCompartilhadoModule {}
