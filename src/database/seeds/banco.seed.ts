import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Banco } from '../entities/banco.entity';

export default class BancoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Banco);
    await repository.insert([
      {
        codigo: '001',
        nome: 'Banco do Brasil',
      },
      {
        codigo: '104',
        nome: 'Caixa Econômica Federal',
      },
      {
        codigo: '237',
        nome: 'Banco Bradesco',
      },
      {
        codigo: '341',
        nome: 'Banco Itaú Unibanco',
      },
      {
        codigo: '033',
        nome: 'Banco Santander',
      },
      {
        codigo: '422',
        nome: 'Banco Safra',
      },
      {
        codigo: '745',
        nome: 'Banco Citibank',
      },
      {
        codigo: '077',
        nome: 'Banco Inter',
      },
      {
        codigo: '707',
        nome: 'Banco Daycoval',
      },
      {
        codigo: '611',
        nome: 'Banco Paulista',
      },
      {
        codigo: '260',
        nome: 'Nubank',
      },
    ]);
  }
}
