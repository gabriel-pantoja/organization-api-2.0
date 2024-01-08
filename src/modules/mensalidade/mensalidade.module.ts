import { Module } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { MensalidadeController } from './mensalidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensalidade } from 'src/database/entities/mensalidade.entity';
import { MensalidadeDomain } from './mensalidade.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Mensalidade])],
  controllers: [MensalidadeController],
  providers: [MensalidadeService, MensalidadeDomain],
})
export class MensalidadeModule {}
