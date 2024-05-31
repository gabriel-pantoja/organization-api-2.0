import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Debito } from './debito.entity';
import { MeuDebito } from './meu-debito.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => Debito, (debito) => debito.categoria)
  debito: Debito[];

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.categoria)
  meuDebito: MeuDebito[];
}
