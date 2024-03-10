import { Module } from '@nestjs/common';
import { EstatisticaController } from './estatistica.controller';
import { EstatisticaDomain } from './estatistica.domain';
import { VinculoCompraProdutoService } from '../vinculo-compra-produto/vinculo-compra-produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinculoCompraProduto])],
  controllers: [EstatisticaController],
  providers: [EstatisticaDomain, VinculoCompraProdutoService],
})
export class EstatisticaModule {}
