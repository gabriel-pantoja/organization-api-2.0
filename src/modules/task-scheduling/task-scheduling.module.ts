import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingService } from 'src/modules/task-scheduling/task-scheduling.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { EmailService } from 'src/core/services/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VinculoDebitoUsuario]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TaskSchedulingService, EmailService],
})
export class TaskSchedulingSModule {}
