import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/database/entities/usuario.entity';
import { UsuarioDomain } from './usuario.domain';
import { PlanoService } from 'src/core/services/plano.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { Plano } from 'src/database/entities/plano.entity';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';
import { EmailService } from 'src/core/services/email.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      DebitoCompartilhadoUsuario,
      Plano,
      Mensalidade,
    ]),
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioDomain,
    DebitoCompartilhadoUsuarioService,
    PlanoService,
    MensalidadeService,
    EmailService,
  ],
})
export class UsuarioModule {}
