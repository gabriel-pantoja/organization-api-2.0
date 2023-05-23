import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './data/data.module';
import { AuthModule } from './modules/auth.module';
import { DebtTypeModule } from './modules/debt-type.module';
import { DebtModule } from './modules/debt.module';
import { GroupModule } from './modules/group.module';
import { LinkedUserGroupModule } from './modules/linked-user-group.module';
import { LinkedDebtUserModule } from './modules/linked-debt-user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RolesGuard } from './core/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    DebtTypeModule,
    DebtModule,
    GroupModule,
    LinkedUserGroupModule,
    LinkedDebtUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
