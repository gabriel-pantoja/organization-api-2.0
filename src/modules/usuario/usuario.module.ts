import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/database/entities/usuario.entity';
import { UsuarioDomain } from './usuario.domain';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { PlanoService } from 'src/core/services/plano.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { Plano } from 'src/database/entities/plano.entity';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';
import { EmailService } from 'src/core/services/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      VinculoDebitoUsuario,
      Plano,
      Mensalidade,
    ]),
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioDomain,
    VinculoDebitoUsuarioService,
    PlanoService,
    MensalidadeService,
    EmailService,
  ],
})
export class UsuarioModule {}
