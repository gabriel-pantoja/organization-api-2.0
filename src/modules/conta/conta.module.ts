import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaDomanin } from 'src/modules/conta/conta.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebitoCompartilhadoUsuario])],
  controllers: [ContaController],
  providers: [ContaDomanin, DebitoCompartilhadoUsuarioService],
})
export class ContaModule {}
