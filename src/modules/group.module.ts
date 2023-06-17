import { Module } from '@nestjs/common';
import { GroupService } from '../core/services/group.service';
import { GroupController } from '../controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/data/entities/group.entity';
import { LinkedUserGroupService } from 'src/core/services/linked-user-group.service';
import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, LinkedUserGroup])],
  controllers: [GroupController],
  providers: [GroupService, LinkedUserGroupService],
})
export class GroupModule {}
