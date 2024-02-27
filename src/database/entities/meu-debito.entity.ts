import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class MeuDebito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({
    name: 'valor',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  valor: number;

  @Column({
    name: 'valor_juros',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: null,
    nullable: true,
  })
  valorJuros: number;

  @Column({ name: 'vencimento', type: 'date' })
  vencimento: Date;

  @Column({ name: 'referenteMesAno', type: 'varchar', length: 10 })
  referenteMesAno: string;

  @Column({ name: 'pago', type: 'bool', default: false })
  pago: boolean;

  @Column({ name: 'juros', type: 'bool', nullable: true })
  juros: boolean;

  @Column({ name: 'data_pagamento', type: 'datetime', nullable: true })
  dataPagamento: Date;

  @Column({
    name: 'local_pagamento',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  localPagamento: string;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.meuDebito, {
    nullable: false,
  })
  usuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
