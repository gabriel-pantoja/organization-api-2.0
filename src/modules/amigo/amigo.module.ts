import { Module } from '@nestjs/common';
import { AmigoController } from './amigo.controller';
import { AmigoDomain } from './amigo.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoAmigoService } from '../../core/services/vinculo-amigo.service';
import { EmailService } from 'src/core/services/email.service';
import { VinculoAmigo } from 'src/database/entities/vinculo-amigo.entity';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      DebitoCompartilhadoUsuario,
      VinculoAmigo,
    ]),
  ],
  controllers: [AmigoController],
  providers: [
    AmigoDomain,
    UsuarioService,
    DebitoCompartilhadoUsuarioService,
    VinculoAmigoService,
    EmailService,
  ],
})
export class AmigoModule {}
