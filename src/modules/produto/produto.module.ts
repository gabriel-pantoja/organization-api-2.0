import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoDomain } from './produto.domain';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { Produto } from 'src/database/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoDomain, ProdutoService],
})
export class ProdutoModule {}
