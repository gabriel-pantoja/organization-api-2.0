import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { EmailService } from '../../core/services/email.service';
import {
  IDebitoAtrasado,
  IDebitoTresDiasAntesVencer,
  IDebitoVenceHoje,
} from '../../core/interfaces/email.interface';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Injectable()
export class TaskSchedulingService {
  constructor(
    @InjectRepository(DebitoCompartilhadoUsuario)
    private readonly repository: Repository<DebitoCompartilhadoUsuario>,
    private readonly emailService: EmailService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_4AM) // Define o cron para rodar todos os dias às 4 da manhã
  // handleDailyTask() {
  //   // Lógica da tarefa diária aqui
  //   console.log('Tarefa diária executada!');
  // }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleVerificarDebitoAtrasado() {
    const data = await this.repository.find({
      relations: {
        usuario: true,
        debitoCompartilhado: { responsavel: true },
      },
      where: {
        debitoCompartilhado: { vencimento: LessThan(new Date()), pago: false },
      },
    });

    data.forEach(async (x) => {
      const body: IDebitoAtrasado = {
        email: x.usuario.email,
        debito: x.debitoCompartilhado.nome,
        valor: x.debitoCompartilhado.valor,
        referenteMesAno: x.debitoCompartilhado.referenteMesAno,
        responsavel: x.debitoCompartilhado.responsavel.nome,
        vencimento: x.debitoCompartilhado.vencimento,
      };

      await this.emailService.sendDebitoAtrasado(body);
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleVerificarDebitoVenceHoje() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await this.repository.find({
      relations: {
        usuario: true,
        debitoCompartilhado: { responsavel: true },
      },
      where: {
        debitoCompartilhado: {
          vencimento: Between(
            today,
            new Date(today.getTime() + 24 * 60 * 60 * 1000),
          ),
          pago: false,
        },
      },
    });

    data.forEach(async (x) => {
      const body: IDebitoVenceHoje = {
        email: x.usuario.email,
        debito: x.debitoCompartilhado.nome,
        valor: x.debitoCompartilhado.valor,
        referenteMesAno: x.debitoCompartilhado.referenteMesAno,
        responsavel: x.debitoCompartilhado.responsavel.nome,
        vencimento: x.debitoCompartilhado.vencimento,
      };

      await this.emailService.sendDebitoVenceHoje(body);
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleVerificarDebitoTresDiasAntesVencer() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysAfter = addDays(today, 3);

    const data = await this.repository.find({
      relations: {
        usuario: true,
        debitoCompartilhado: { responsavel: true },
      },
      where: {
        debitoCompartilhado: {
          vencimento: Between(
            startOfDay(threeDaysAfter),
            endOfDay(threeDaysAfter),
          ),
          pago: false,
        },
      },
    });

    data.forEach(async (x) => {
      const body: IDebitoTresDiasAntesVencer = {
        email: x.usuario.email,
        debito: x.debitoCompartilhado.nome,
        valor: x.debitoCompartilhado.valor,
        referenteMesAno: x.debitoCompartilhado.referenteMesAno,
        responsavel: x.debitoCompartilhado.responsavel.nome,
        vencimento: x.debitoCompartilhado.vencimento,
      };

      await this.emailService.sendDebitoTresDiasAntesVencer(body);
    });
  }
}
