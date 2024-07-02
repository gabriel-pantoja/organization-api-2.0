import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MeuDebito } from './meu-debito.entity';
import { DebitoProporcional } from './debito-proporcioal';

@Entity()
export class LocalPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.localPagamento)
  meuDebito: MeuDebito[];

  @OneToMany(() => DebitoProporcional, (debitoProporcional) => debitoProporcional.localPagamento)
  debitoProporcional: DebitoProporcional[];
}
