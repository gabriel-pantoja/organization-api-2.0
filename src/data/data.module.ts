import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Debt } from './entities/debt.entity';
import { DebtType } from './entities/debt-type.entity';
import { Group } from './entities/group.entity';
import { LinkedUserGroup } from './entities/linked-user-group.entity';
import { LinkedDebtUser } from './entities/linked-debt-user.entity';
import { Plan } from './entities/plan.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env.prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [
        User,
        Group,
        LinkedUserGroup,
        Debt,
        DebtType,
        LinkedDebtUser,
        Plan,
        Profile,
      ],
      migrations: [],
      subscribers: [],
    }),
  ],
})
export class DatabaseModule {}
