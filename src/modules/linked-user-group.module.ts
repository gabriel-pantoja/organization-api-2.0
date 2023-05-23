import { Module } from '@nestjs/common';
import { LinkedUserGroupService } from '../core/services/linked-user-group.service';
import { LinkedUserGroupController } from '../controllers/linked-user-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkedUserGroup])],
  controllers: [LinkedUserGroupController],
  providers: [LinkedUserGroupService],
})
export class LinkedUserGroupModule {}
