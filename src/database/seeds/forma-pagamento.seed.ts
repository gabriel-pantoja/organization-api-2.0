import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { FormaPagamento } from '../entities/forma-pagamento.entity';

export default class FormaPagamentoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(FormaPagamento);
    await repository.insert([
      {
        nome: 'Boleto',
      },
      {
        nome: 'Dinheiro',
      },
      {
        nome: 'Débito Aumático',
      },
      {
        nome: 'Cartão de Crédito',
      },
    ]);
  }
}
