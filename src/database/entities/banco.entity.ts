import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MeuDebito } from './meu-debito.entity';

@Entity()
export class Banco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'codigo', type: 'varchar', length: 3 })
  codigo: string;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.banco)
  meuDebito: MeuDebito[];
}
