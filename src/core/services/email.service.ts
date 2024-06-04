import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplateEmailHelper } from '../helpers/template-email.helper';
import {
  IConvidarAmigo,
  IDebitoAtrasado,
  IDebitoTresDiasAntesVencer,
  IDebitoVenceHoje,
  IEsqueceuSenha,
  INovaSenha,
} from '../interfaces/email.interface';
import { DebitoCompartilhadoPost } from 'src/modules/debito-compartilhado/request/debito-compartilhado.post';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEsqueceuSenha(body: IEsqueceuSenha) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Vamos redefinir a sua senha',
      html: TemplateEmailHelper.EsqueceuSenha(body),
    });
  }

  async sendNovaSenha(body: INovaSenha) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Bem vindo!! Agora so criar uma senha',
      html: TemplateEmailHelper.NovaSenha(body),
    });
  }

  async sendConvidarAmigo(body: IConvidarAmigo) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece que seu amigo te convidou',
      html: TemplateEmailHelper.ConvidarAmigo(body),
    });
  }

  async sendLembrete(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Opa! Parece que voce se esqueceu',
      html: TemplateEmailHelper.Lembrete(),
    });
  }

  async sendDebitoTresDiasAntesVencer(body: IDebitoTresDiasAntesVencer) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece que seu debito vence daqui a 3 dias',
      html: TemplateEmailHelper.DebitoTresDiasAntesVencer(body),
    });
  }

  async sendDebitoAtrasado(body: IDebitoAtrasado) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece que voce se esqueceu',
      html: TemplateEmailHelper.DebitoAtrasado(body),
    });
  }

  async sendDebitoVenceHoje(body: IDebitoVenceHoje) {
    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Opa! Parece prazo vence hoje',
      html: TemplateEmailHelper.DebitoVenceHoje(body),
    });
  }

  async sendVinculadoNovoDebito(email: string, data: DebitoCompartilhadoPost) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Opa! Parece que você tem um novo débito',
      html: TemplateEmailHelper.VinculadoNovoDebito(data),
    });
  }
}
