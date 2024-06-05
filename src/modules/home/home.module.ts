import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { MeuDebitoService } from '../meu-debito/meu-debito.service';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';
import { HomeController } from './home.controller';
import { HomeDomanin } from './home.domain';

@Module({
  imports: [TypeOrmModule.forFeature([DebitoCompartilhadoUsuario, MeuDebito])],
  controllers: [HomeController],
  providers: [HomeDomanin, DebitoCompartilhadoUsuarioService, MeuDebitoService],
})
export class HomeModule {}
