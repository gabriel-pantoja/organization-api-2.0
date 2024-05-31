import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { FormaPagamento } from './forma-pagamento.entity';
import { Cartao } from './cartao.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class MeuDebito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  categoriaId: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.meuDebito, {
    nullable: false,
  })
  categoria: Categoria;

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

  @Column({ name: 'pago', type: 'bool', nullable: true, default: null })
  pago: boolean;

  @Column({ default: 1 })
  formaPagamentoId: number;

  @ManyToOne(() => FormaPagamento, (formaPagamento) => formaPagamento.meuDebito)
  formaPagamento: FormaPagamento;

  @Column({ default: 1, nullable: true })
  cartaoId: number;

  @ManyToOne(() => Cartao, (cartao) => cartao.meuDebito)
  cartao: Cartao;

  @Column({ name: 'juros', type: 'bool', nullable: true })
  juros: boolean;

  @Column({ name: 'data_pagamento', type: 'datetime', nullable: true })
  dataPagamento: Date;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.meuDebito, {
    nullable: false,
  })
  usuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
