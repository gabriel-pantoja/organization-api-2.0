import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Opa! Vamos redefinir a sua senha',
        html: TemplateEmailHelper.EsqueceuSenha(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendNovaSenha(body: INovaSenha) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Bem vindo!! Agora so criar uma senha',
        html: TemplateEmailHelper.NovaSenha(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendConvidarAmigo(body: IConvidarAmigo) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Opa! Parece que seu amigo te convidou',
        html: TemplateEmailHelper.ConvidarAmigo(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendLembrete(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Opa! Parece que voce se esqueceu',
        html: TemplateEmailHelper.Lembrete(),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendDebitoTresDiasAntesVencer(body: IDebitoTresDiasAntesVencer) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Opa! Parece que seu debito vence daqui a 3 dias',
        html: TemplateEmailHelper.DebitoTresDiasAntesVencer(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendDebitoAtrasado(body: IDebitoAtrasado) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Opa! Parece que voce se esqueceu',
        html: TemplateEmailHelper.DebitoAtrasado(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendDebitoVenceHoje(body: IDebitoVenceHoje) {
    try {
      await this.mailerService.sendMail({
        to: body.email,
        subject: 'Opa! Parece prazo vence hoje',
        html: TemplateEmailHelper.DebitoVenceHoje(body),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }

  async sendVinculadoNovoDebito(email: string, data: DebitoCompartilhadoPost) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Opa! Parece que você tem um novo débito',
        html: TemplateEmailHelper.VinculadoNovoDebito(data),
      });
    } catch (error) {
      throw new BadRequestException(`Falha ao enviar e-mail.`);
    }
  }
}
