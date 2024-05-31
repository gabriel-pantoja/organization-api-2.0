import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Plano } from '../entities/plano.entity';

export default class PlanoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Plano);
    await repository.insert([
      {
        nome: 'Basico',
      },
      {
        nome: 'Plus',
      },
      {
        nome: 'Premium',
      },
    ]);
  }
}
