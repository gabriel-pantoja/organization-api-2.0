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
        nome: 'Casa | Apto',
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
        nome: 'Compras',
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
      {
        nome: 'Empresa',
      },
      {
        nome: 'Cartão de Crédito',
      },
      {
        nome: 'Carnê',
      },
    ]);
  }
}
