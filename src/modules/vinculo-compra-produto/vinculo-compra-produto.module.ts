import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinculoCompraProdutoDomain } from './vinculo-compra-produto.domain';
import { VinculoCompraProdutoController } from './vinculo-compra-produto.controller';
import { VinculoCompraProdutoService } from './vinculo-compra-produto.service';
import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VinculoCompraProduto])],
  controllers: [VinculoCompraProdutoController],
  providers: [VinculoCompraProdutoDomain, VinculoCompraProdutoService],
})
export class VinculoCompraProdutoModule {}
