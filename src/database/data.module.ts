import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './entities/usuario.entity';
import { Debito } from './entities/debito.entity';
import { VinculoDebitoUsuario } from './entities/vinculo-debito-usuario.entity';
import { Plano } from './entities/plano.entity';
import { Perfil } from './entities/perfil.entity';
import { Mensalidade } from './entities/mensalidade.entity';
import { VinculoAmigo } from './entities/vinculo-amigo.entity';
import { Produto } from './entities/produto.entity';
import { Compra } from './entities/compra.entity';
import { MeuDebito } from './entities/meu-debito.entity';
import { VinculoCompraProduto } from './entities/vinculo-compra-produto.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: '.env.prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [
        Usuario,
        Debito,
        VinculoDebitoUsuario,
        Plano,
        Perfil,
        Mensalidade,
        VinculoAmigo,
        Compra,
        Produto,
        VinculoCompraProduto,
        MeuDebito,
      ],
      migrations: [],
      subscribers: [],
    }),
  ],
})
export class DatabaseModule {}
