import { Module } from '@nestjs/common';
import { VinculoDebitoUsuarioService } from './vinculo-debito-usuario.service';
import { VinculoDebitoUsuarioController } from './vinculo-debito-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculoDebitoUsuarioDomain } from './vinculo-debito-usuario.domain';

@Module({
  imports: [TypeOrmModule.forFeature([VinculoDebitoUsuario])],
  controllers: [VinculoDebitoUsuarioController],
  providers: [VinculoDebitoUsuarioService, VinculoDebitoUsuarioDomain],
})
export class VinculoDebitoUsuarioModule {}
