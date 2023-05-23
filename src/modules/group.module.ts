import { Module } from '@nestjs/common';
import { GroupService } from '../core/services/group.service';
import { GroupController } from '../controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/data/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
