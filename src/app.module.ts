import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/data.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { MensalidadeModule } from './modules/mensalidade/mensalidade.module';
import { AmigoModule } from './modules/amigo/amigo.module';
import { NotificarModule } from './modules/notificar/notificar.module';
import { TaskSchedulingSModule } from './modules/task-scheduling/task-scheduling.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { CompraModule } from './modules/compra-mensal/compra.module';
import { MeuDebitoModule } from './modules/meu-debito/meu-debito.module';
import { VinculoCompraProdutoModule } from './modules/vinculo-compra-produto/vinculo-compra-produto.module';
import { EstatisticaModule } from './modules/estatistica/estatistica.module';
import { DebitoCompartilhadoModule } from './modules/debito-compartilhado/debito-compartilhado.module';
import { DebitoCompartilhadoUsuarioModule } from './modules/debito-compartilhado-usuario/debito-compartilhado-usuario.module';
import { HomeModule } from './modules/home/home.module';
import { VinculadoUsuarioModule } from './modules/vinculado-usuario/vinculado-usuario.module';
import { DebitoProporcionalUsuarioModule } from './modules/debito-proporcional-usuario/debito-proporcional-usuario.module';
import { DebitoProporcionalModule } from './modules/debito-proporcional/debito-proporcional.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: '.env.prod',
    }),
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    DebitoCompartilhadoModule,
    DebitoCompartilhadoUsuarioModule,
    MensalidadeModule,
    HomeModule,
    AmigoModule,
    VinculadoUsuarioModule,
    NotificarModule,
    ProdutoModule,
    CompraModule,
    MeuDebitoModule,
    VinculoCompraProdutoModule,
    EstatisticaModule,
    DebitoProporcionalModule,
    DebitoProporcionalUsuarioModule,
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
