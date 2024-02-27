import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeuDebitoController } from './meu-debito.controller';
import { MeuDebitoDomain } from './meu-debito.domain';
import { MeuDebitoService } from './meu-debito.service';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeuDebito])],
  controllers: [MeuDebitoController],
  providers: [MeuDebitoDomain, MeuDebitoService],
})
export class MeuDebitoModule {}
