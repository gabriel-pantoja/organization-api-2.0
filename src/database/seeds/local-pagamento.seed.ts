import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { LocalPagamento } from '../entities/local-pagemento.entity';

export default class LocalPagamentoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(LocalPagamento);
    await repository.insert([
      {
        nome: 'Banco',
      },
      {
        nome: 'Casa Lotérica',
      },
      {
        nome: 'Loja Física',
      },
      {
        nome: 'Caixa Eletrônico',
      },
    ]);
  }
}
