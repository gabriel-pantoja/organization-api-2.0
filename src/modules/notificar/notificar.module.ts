import { Module } from '@nestjs/common';
import { NotificarController } from './notificar.controller';
import { NotificarDomain } from './notificar.domain';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from 'src/core/services/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: '.env.prod',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST, //host smtp
        secure: true, //regras de segurança do serviço smtp
        port: 465, // porta
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
  ],
  controllers: [NotificarController],
  providers: [NotificarDomain, EmailService],
})
export class NotificarModule {}
