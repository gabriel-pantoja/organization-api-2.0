import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TipoDebito } from '../entities/tipo-debito.entity';

export default class TipoDebitoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // await dataSource.query('TRUNCATE "perfil" RESTART IDENTITY;');

    const repository = dataSource.getRepository(TipoDebito);
    await repository.insert([
      {
        nome: 'Aluguel',
      },
      {
        nome: 'Condomínio',
      },
      {
        nome: 'IPTU',
      },
      {
        nome: 'Imposto',
      },
      {
        nome: 'Luz',
      },
      {
        nome: 'Internet',
      },
      {
        nome: 'Gás',
      },
      {
        nome: 'Telefone',
      },
      {
        nome: 'Coworking',
      },
      {
        nome: 'Netflix',
      },
      {
        nome: 'Spotify',
      },
      {
        nome: 'Serviço',
      },
      {
        nome: 'Amazon Prime',
      },
      {
        nome: 'Disney',
      },
      {
        nome: 'Mercado Livre',
      },
      {
        nome: 'Ifood',
      },
      {
        nome: 'Globo Play',
      },
      {
        nome: 'HBO Max',
      },
      {
        nome: 'Curso',
      },
      {
        nome: 'Roupas',
      },
      {
        nome: 'Cinema',
      },
      {
        nome: 'Show',
      },
      {
        nome: 'Uber',
      },
      {
        nome: 'Contabilidade',
      },
      {
        nome: 'Plano de Saúde',
      },
      {
        nome: 'Dentista',
      },
      {
        nome: 'Academia',
      },
      {
        nome: 'Mercado',
      },
      {
        nome: 'Seguro do Carro',
      },
      {
        nome: 'Gasolina',
      },
      {
        nome: 'Loja',
      },
      {
        nome: 'Banco Digital',
      },
      {
        nome: 'Banco Tradicional',
      },
    ]);
  }
}
