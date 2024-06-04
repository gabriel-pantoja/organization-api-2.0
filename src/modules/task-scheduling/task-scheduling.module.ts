import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingService } from 'src/modules/task-scheduling/task-scheduling.service';
import { EmailService } from 'src/core/services/email.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebitoCompartilhadoUsuario]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TaskSchedulingService, EmailService],
})
export class TaskSchedulingSModule {}
