import { DataSource, DataSourceOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { DebitoCompartilhado } from './entities/debito-compartilhado.entity';
import { Plano } from './entities/plano.entity';
import { Perfil } from './entities/perfil.entity';
import { Mensalidade } from './entities/mensalidade.entity';
import { VinculoAmigo } from './entities/vinculo-amigo.entity';
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
import CartaoSeeder from './seeds/cartao.seed';
import { Cartao } from './entities/cartao.entity';
import { TipoDebito } from './entities/tipo-debito.entity';
import TipoDebitoSeeder from './seeds/tipo-debito.seed';
import { DebitoCompartilhadoUsuario } from './entities/debito-compartilhado-usuario.entity';

//config();
config({ path: '.env.prod' });

export const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  entities: [
    Usuario,
    Categoria,
    TipoDebito,
    Cartao,
    FormaPagamento,
    DebitoCompartilhado,
    DebitoCompartilhadoUsuario,
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
  synchronize: true, // do not set it true in production application
  seeds: [
    PerfilSeeder,
    PlanoSeeder,
    CategoriaSeeder,
    TipoDebitoSeeder,
    CartaoSeeder,
    FormaPagamentoSeeder,
  ],
};

export const dataSource = new DataSource(options);
