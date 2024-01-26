import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/core/services/email.service';
import { DebitoAtrasadoPost } from './request/debito-atrasado.post';
import { PrazoLimitePost } from './request/prazo-limite.post';

@Injectable()
export class NotificarDomain {
  constructor(private emailService: EmailService) {}

  async viaEmail(email: string) {
    await this.emailService.sendLembrete(email);
  }

  async viaEmailDebitoAtrasado(body: DebitoAtrasadoPost) {
    await this.emailService.sendDebitoAtrasado(body);
  }

  async viaEmailPrazoLimite(body: PrazoLimitePost) {
    await this.emailService.sendPrazoLimite(body);
  }

  async viaWhatsapp(numero: string) {
    return 'Mensagem enviado';
  }
}
