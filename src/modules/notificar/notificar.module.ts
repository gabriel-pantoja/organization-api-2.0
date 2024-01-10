import { Module } from '@nestjs/common';
import { NotificarController } from './notificar.controller';
import { NotificarDomain } from './notificar.domain';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from 'src/core/services/email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mail.pantoja.dev', //host smtp
        secure: true, //regras de segurança do serviço smtp
        port: 465, // porta
        auth: {
          user: 'no-reply@pantoja.dev',
          pass: 'rg&gZVNXRcFd',
        },
        ignoreTLS: true,
      },
      defaults: {
        from: 'no-reply@pantoja.dev',
      },
    }),
  ],
  controllers: [NotificarController],
  providers: [NotificarDomain, EmailService],
})
export class NotificarModule {}
