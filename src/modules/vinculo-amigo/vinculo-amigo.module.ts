import { Module } from '@nestjs/common';
import { VinculoAmigoService } from './vinculo-amigo.service';
import { VinculoAmigoController } from './vinculo-amigo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoAmigo } from 'src/database/entities/vinculo-amigo.entity';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculoAmigoDomain } from './vinculo-amigo.domain';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VinculoAmigo, VinculoDebitoUsuario, Usuario]),
  ],
  controllers: [VinculoAmigoController],
  providers: [
    VinculoAmigoService,
    VinculoDebitoUsuarioService,
    VinculoAmigoDomain,
    UsuarioService,
  ],
})
export class VinculoAmigoModule {}
