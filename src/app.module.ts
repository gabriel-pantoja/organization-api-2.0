import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/data.module';
import { AuthModule } from './modules/auth/auth.module';
import { DebitoModule } from './modules/debito/debito.module';
import { VinculoDebitoUsuarioModule } from './modules/vinculo-debito-usuario/vinculo-debito-usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { MensalidadeModule } from './modules/mensalidade/mensalidade.module';
import { ContaModule } from './modules/conta/conta.module';
import { AmigoModule } from './modules/amigo/amigo.module';
import { NotificarModule } from './modules/notificar/notificar.module';
import { TaskSchedulingSModule } from './modules/task-scheduling/task-scheduling.module';
import { PlanoModule } from './modules/plano/plano.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: '.env.prod'
    }),
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    DebitoModule,
    VinculoDebitoUsuarioModule,
    MensalidadeModule,
    ContaModule,
    AmigoModule,
    PlanoModule,
    NotificarModule,
    TaskSchedulingSModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ProfileGuard,
    },
  ],
})
export class AppModule {}
