import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';
import { HomeController } from './home.controller';
import { HomeDomanin } from './home.domain';
import { HomeService } from './home.service';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DebitoCompartilhado, MeuDebito])],
  controllers: [HomeController],
  providers: [HomeDomanin, HomeService],
})
export class HomeModule {}
