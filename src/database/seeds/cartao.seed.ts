import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cartao } from '../entities/cartao.entity';

export default class CartaoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Cartao);
    await repository.insert([
      {
        nome: 'Bradesco',
      },
      {
        nome: 'Nubank',
      },
      {
        nome: 'Itáu',
      },
      {
        nome: 'Banco do Brasil',
      },
      {
        nome: 'Casa Lotérica',
      },
    ]);
  }
}
