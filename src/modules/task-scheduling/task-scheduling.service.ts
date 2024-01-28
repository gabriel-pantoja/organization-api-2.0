import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { Between, Repository } from 'typeorm';
import { EmailService } from '../../core/services/email.service';
import {
  IDebitoAtrasado,
  IDebitoTresDiasAntesVencer,
  IDebitoVenceHoje,
} from '../../core/interfaces/email.interface';
import { addDays, endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class TaskSchedulingService {
  constructor(
    @InjectRepository(VinculoDebitoUsuario)
    private readonly repository: Repository<VinculoDebitoUsuario>,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM) // Define o cron para rodar todos os dias às 4 da manhã
  handleDailyTask() {
    // Lógica da tarefa diária aqui
    console.log('Tarefa diária executada!');
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleVerificarDebitoAtrasado() {
  //   const data = await this.repository.find({
  //     relations: {
  //       usuario: true,
  //       debito: { responsavel: true },
  //     },
  //     where: {
  //       debito: { vencimento: LessThan(new Date()) },
  //     },
  //   });

  //   data.forEach(async (x) => {
  //     const body: IDebitoAtrasadoEmail = {
  //       email: x.usuario.email,
  //       debito: x.debito.nome,
  //       valor: x.debito.valor,
  //       referenteMesAno: x.debito.referenteMesAno,
  //       responsavel: x.debito.responsavel.nome,
  //       vencimento: x.debito.vencimento,
  //     };
  //     await this.emailService.sendDebitoAtrasado(body);
  //     console.log('enviado');
  //   });
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleVerificarDebitoVenceHoje() {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const data = await this.repository.find({
  //     relations: {
  //       usuario: true,
  //       debito: { responsavel: true },
  //     },
  //     where: {
  //       debito: {
  //         vencimento: Between(
  //           today,
  //           new Date(today.getTime() + 24 * 60 * 60 * 1000),
  //         ),
  //       },
  //     },
  //   });

  //   data.forEach(async (x) => {
  //     const body: IDebitoVenceHoje = {
  //       email: x.usuario.email,
  //       debito: x.debito.nome,
  //       valor: x.debito.valor,
  //       referenteMesAno: x.debito.referenteMesAno,
  //       responsavel: x.debito.responsavel.nome,
  //       vencimento: x.debito.vencimento,
  //     };
  //     await this.emailService.sendDebitoVenceHoje(body);
  //     console.log('enviado');
  //   });
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async handleVerificarDebitoTresDiasAntesVencer() {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   const threeDaysAfter = addDays(today, 3);

  //   const data = await this.repository.find({
  //     relations: {
  //       usuario: true,
  //       debito: { responsavel: true },
  //     },
  //     where: {
  //       debito: {
  //         vencimento: Between(
  //           startOfDay(threeDaysAfter),
  //           endOfDay(threeDaysAfter),
  //         ),
  //       },
  //     },
  //   });

  //   data.forEach(async (x) => {
  //     const body: IDebitoTresDiasAntesVencer = {
  //       email: x.usuario.email,
  //       debito: x.debito.nome,
  //       valor: x.debito.valor,
  //       referenteMesAno: x.debito.referenteMesAno,
  //       responsavel: x.debito.responsavel.nome,
  //       vencimento: x.debito.vencimento,
  //     };
  //     await this.emailService.sendDebitoTresDiasAntesVencer(body);
  //     console.log('enviado');
  //   });
  // }
}
