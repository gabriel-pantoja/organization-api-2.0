import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplateEmailHelper } from '../helpers/template-email.helper';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async send(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Opa! Parece que voce se esqueceu',
      html: TemplateEmailHelper.NaoPago(),
    });
  }
}
