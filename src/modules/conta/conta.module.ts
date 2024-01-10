import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaDomanin } from 'src/modules/conta/conta.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoDebitoUsuarioService } from 'src/modules/vinculo-debito-usuario/vinculo-debito-usuario.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinculoDebitoUsuario])],
  controllers: [ContaController],
  providers: [ContaDomanin, VinculoDebitoUsuarioService],
})
export class ContaModule {}
