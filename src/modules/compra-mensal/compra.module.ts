import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraDomain } from './compra.domain';
import { CompraService } from './compra.service';
import { Compra } from 'src/database/entities/compra.entity';
import { CompraController } from './compra.controller';
import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, VinculoCompraProduto])],
  controllers: [CompraController],
  providers: [CompraDomain, CompraService],
})
export class CompraModule {}
