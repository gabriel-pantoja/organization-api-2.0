import { Module } from '@nestjs/common';
import { LinkedFriendService } from '../core/services/linked-friend.service';
import { LinkedFriendController } from '../controllers/linked-friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedFriend } from 'src/data/entities/linked-friend.entity';
import { UserService } from 'src/core/services/user.service';
import { User } from 'src/data/entities/user.entity';
import { PlanService } from 'src/core/services/plan.service';
import { FinancialControlService } from 'src/core/services/financial-control.service';
import { Plan } from 'src/data/entities/plan.entity';
import { FinancialControl } from 'src/data/entities/financial-control.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkedFriend, User, Plan, FinancialControl]),
  ],
  controllers: [LinkedFriendController],
  providers: [
    LinkedFriendService,
    UserService,
    PlanService,
    FinancialControlService,
  ],
})
export class LinkedFriendModule {}
