import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/constants/jwt.constant';
import { AuthDomain } from './auth.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/database/entities/usuario.entity';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Mensalidade, VinculoDebitoUsuario]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthDomain,
    UsuarioService,
    MensalidadeService,
    VinculoDebitoUsuarioService,
  ],
})
export class AuthModule {}
