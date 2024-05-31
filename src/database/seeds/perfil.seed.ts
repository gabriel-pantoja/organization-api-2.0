import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Perfil } from '../entities/perfil.entity';

export default class PerfilSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Perfil);
    await repository.insert([
      {
        nome: 'Admin',
      },
      {
        nome: 'Usuario',
      },
    ]);
  }
}
