import { Module } from '@nestjs/common';
import { AmigoController } from './amigo.controller';
import { AmigoDomain } from './amigo.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, VinculoDebitoUsuario])],
  controllers: [AmigoController],
  providers: [AmigoDomain, UsuarioService, VinculoDebitoUsuarioService],
})
export class AmigoModule {}
