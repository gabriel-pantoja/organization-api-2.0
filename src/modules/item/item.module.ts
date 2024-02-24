import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/database/entities/item.entity';
import { ItemController } from './item.controller';
import { ItemDomain } from './item.domain';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemDomain, ItemService],
})
export class ItemModule {}
