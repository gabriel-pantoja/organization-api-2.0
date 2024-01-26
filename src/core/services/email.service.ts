import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplateEmailHelper } from '../helpers/template-email.helper';
import { DebitoAtrasadoPost } from 'src/modules/notificar/request/debito-atrasado.post';
import { DebitoPost } from 'src/modules/debito/request/debito.post';
import { PrazoLimitePost } from 'src/modules/notificar/request/prazo-limite.post';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendLembrete(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Opa! Parece que voce se esqueceu',
      html: TemplateEmailHelper.Lembrete(),
    });
  }

  async sendDebitoAtrasado(body: DebitoAtrasadoPost) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece que voce se esqueceu',
      html: TemplateEmailHelper.DebitoAtrasado(body),
    });
  }

  async sendPrazoLimite(body: PrazoLimitePost) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece prazo vence hoje',
      html: TemplateEmailHelper.PrazoLimite(body),
    });
  }

  async sendVinculadoNovoDebito(email: string, data: DebitoPost) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Opa! Parece que você tem um novo débito',
      html: TemplateEmailHelper.VinculadoNovoDebito(data),
    });
  }
}
