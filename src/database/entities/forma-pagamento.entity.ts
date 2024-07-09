import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MeuDebito } from './meu-debito.entity';
import { DebitoProporcional } from './debito-proporcional';

@Entity()
export class FormaPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.formaPagamento)
  meuDebito: MeuDebito[];

  @OneToMany(
    () => DebitoProporcional,
    (debitoProporcional) => debitoProporcional.formaPagamento,
  )
  debitoProporcional: DebitoProporcional[];
}
