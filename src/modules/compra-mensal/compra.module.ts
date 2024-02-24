import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraDomain } from './compra.domain';
import { CompraService } from './compra.service';
import { Compra } from 'src/database/entities/compra.entity';
import { CompraController } from './compra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Compra])],
  controllers: [CompraController],
  providers: [CompraDomain, CompraService],
})
export class CompraModule {}
