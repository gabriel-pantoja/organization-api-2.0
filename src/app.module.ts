import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/data.module';
import { AuthModule } from './modules/auth/auth.module';
import { TipoDebitoModule } from './modules/tipo-debito/tipo-debito.module';
import { DebitoModule } from './modules/debito/debito.module';
import { GrupoModule } from './modules/grupo/grupo.module';
import { VinculoUsuarioGrupoModule } from './modules/vinculo-usuario-grupo/vinculo-usuario-grupo.module';
import { VinculoDebitoUsuarioModule } from './modules/vinculo-debito-usuario/vinculo-debito-usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { MensalidadeModule } from './modules/mensalidade/mensalidade.module';
import { VinculoAmigoModule } from './modules/vinculo-amigo/vinculo-amigo.module';
import { ContaModule } from './modules/conta/conta.module';
import { AmigoModule } from './modules/amigo/amigo.module';
import { NotificarModule } from './modules/notificar/notificar.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    TipoDebitoModule,
    DebitoModule,
    GrupoModule,
    VinculoUsuarioGrupoModule,
    VinculoDebitoUsuarioModule,
    MensalidadeModule,
    VinculoAmigoModule,
    ContaModule,
    AmigoModule,
    NotificarModule,
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
