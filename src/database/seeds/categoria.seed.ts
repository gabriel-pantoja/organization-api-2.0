import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

export default class CategoriaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Categoria);
    await repository.insert([
      {
        nome: 'Casa',
      },
      {
        nome: 'Prossional',
      },
      {
        nome: 'Assinatura',
      },
      {
        nome: 'Farmácia e Saúde',
      },
      {
        nome: 'Estudos',
      },
      {
        nome: 'Viagem',
      },
      {
        nome: 'Mercado',
      },
      {
        nome: 'Transporte',
      },
      {
        nome: 'Restaurante',
      },
      {
        nome: 'Shopping',
      },
      {
        nome: 'Lazer',
      },
      {
        nome: 'Festa',
      },
      {
        nome: 'Delivery',
      },
    ]);
  }
}
