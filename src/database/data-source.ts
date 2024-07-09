import { DataSource, DataSourceOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { DebitoCompartilhado } from './entities/debito-compartilhado.entity';
import { Plano } from './entities/plano.entity';
import { Perfil } from './entities/perfil.entity';
import { Mensalidade } from './entities/mensalidade.entity';
import { Produto } from './entities/produto.entity';
import { Compra } from './entities/compra.entity';
import { MeuDebito } from './entities/meu-debito.entity';
import { VinculoCompraProduto } from './entities/vinculo-compra-produto.entity';
import { Categoria } from './entities/categoria.entity';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import PerfilSeeder from './seeds/perfil.seed';
import CategoriaSeeder from './seeds/categoria.seed';
import PlanoSeeder from './seeds/plano.seed';
import { FormaPagamento } from './entities/forma-pagamento.entity';
import FormaPagamentoSeeder from './seeds/forma-pagamento.seed';
import { TipoDebito } from './entities/tipo-debito.entity';
import TipoDebitoSeeder from './seeds/tipo-debito.seed';
import { Banco } from './entities/banco.entity';
import BancoSeeder from './seeds/banco.seed';
import { LocalPagamento } from './entities/local-pagemento.entity';
import LocalPagamentoSeeder from './seeds/local-pagamento.seed';
import { DebitoProporcional } from './entities/debito-proporcional';
import { DebitoCompartilhadoUsuario } from './entities/debito-compartilhado-usuario.entity';
import { DebitoProporcionalUsuario } from './entities/debito-proporcional-usuario.entity';

config();
//config({ path: '.env.prod' });

export const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  entities: [
    Perfil,
    Plano,
    Usuario,
    Categoria,
    TipoDebito,
    Banco,
    LocalPagamento,
    FormaPagamento,
    DebitoCompartilhado,
    DebitoCompartilhadoUsuario,
    MeuDebito,
    Mensalidade,
    Compra,
    Produto,
    VinculoCompraProduto,
    DebitoProporcional,
    DebitoProporcionalUsuario,
  ],
  migrations: [],
  subscribers: [],
  synchronize: true, // do not set it true in production application
  seeds: [
    // PerfilSeeder,
    // BancoSeeder,
    //LocalPagamentoSeeder,
    // PlanoSeeder,
    // CategoriaSeeder,
    // TipoDebitoSeeder,
    // FormaPagamentoSeeder,
  ],
};

export const dataSource = new DataSource(options);
