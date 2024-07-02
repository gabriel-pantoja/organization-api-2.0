import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MeuDebito } from './meu-debito.entity';
import { DebitoProporcional } from './debito-proporcioal';

@Entity()
export class TipoDebito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.tipoDebito)
  meuDebito: MeuDebito[];

  @OneToMany(() => DebitoProporcional, (debitoProporcional) => debitoProporcional.tipoDebito)
  debitoProporcional: DebitoProporcional[];
}
