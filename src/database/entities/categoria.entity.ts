import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DebitoCompartilhado } from './debito-compartilhado.entity';
import { MeuDebito } from './meu-debito.entity';
import { DebitoProporcional } from './debito-proporcional';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(
    () => DebitoCompartilhado,
    (debitoCompartilhado) => debitoCompartilhado.categoria,
  )
  debitoCompartilhado: DebitoCompartilhado[];

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.categoria)
  meuDebito: MeuDebito[];

  @OneToMany(
    () => DebitoProporcional,
    (debitoProporcional) => debitoProporcional.categoria,
  )
  debitoProporcional: DebitoProporcional[];
}
