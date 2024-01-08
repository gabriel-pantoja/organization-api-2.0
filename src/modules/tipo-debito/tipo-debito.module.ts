import { Module } from '@nestjs/common';
import { TipoDebitoService } from './tipo-debito.service';
import { TipoDebitoController } from './tipo-debito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDebito } from 'src/database/entities/tipo-debito.entity';
import { TipoDebitoDomain } from './tipo-debito.domain';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDebito])],
  controllers: [TipoDebitoController],
  providers: [TipoDebitoService, TipoDebitoDomain],
})
export class TipoDebitoModule {}
