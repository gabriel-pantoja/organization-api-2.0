import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthDomain } from './auth.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/database/entities/usuario.entity';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Mensalidade,
      DebitoCompartilhadoUsuario,
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.KEY_JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthDomain,
    UsuarioService,
    MensalidadeService,
    DebitoCompartilhadoUsuarioService,
  ],
})
export class AuthModule {}
