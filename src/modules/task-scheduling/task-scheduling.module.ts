import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingService } from 'src/modules/task-scheduling/task-scheduling.service';
import { EmailService } from 'src/core/services/email.service';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';
import { DebitoCompartilhadoService } from '../debito-compartilhado/debito-compartilhado.service';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';
import { MeuDebitoService } from '../meu-debito/meu-debito.service';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DebitoCompartilhadoUsuario,
      DebitoCompartilhado,
      MeuDebito,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    TaskSchedulingService,
    EmailService,
    DebitoCompartilhadoService,
    DebitoCompartilhadoUsuarioService,
    MeuDebitoService,
  ],
})
export class TaskSchedulingSModule {}
