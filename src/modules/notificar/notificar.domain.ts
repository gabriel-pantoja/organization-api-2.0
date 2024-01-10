import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/core/services/email.service';

@Injectable()
export class NotificarDomain {
  constructor(private emailService: EmailService) {}

  async viaEmail(email: string) {
    await this.emailService.send(email);
  }

  async viaWhatsapp(numero: string) {
    return 'Mensagem enviado';
  }
}
