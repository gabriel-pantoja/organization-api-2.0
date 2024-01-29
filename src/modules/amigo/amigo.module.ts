import { Module } from '@nestjs/common';
import { AmigoController } from './amigo.controller';
import { AmigoDomain } from './amigo.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { VinculoAmigoService } from '../../core/services/vinculo-amigo.service';
import { EmailService } from 'src/core/services/email.service';
import { VinculoAmigo } from 'src/database/entities/vinculo-amigo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, VinculoDebitoUsuario, VinculoAmigo]),
  ],
  controllers: [AmigoController],
  providers: [
    AmigoDomain,
    UsuarioService,
    VinculoDebitoUsuarioService,
    VinculoAmigoService,
    EmailService,
  ],
})
export class AmigoModule {}
