import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Produto } from './produto.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class VinculoCompraProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  produtoId: number;

  @ManyToOne(() => Produto, (produto) => produto.vinculoCompraProduto, {
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @Column()
  compraId: number;

  @ManyToOne(() => Compra, (compra) => compra.vinculoCompraProduto, {
    onDelete: 'CASCADE',
  })
  compra: Compra;

  @Column({ name: 'unidade' })
  unidade: number;

  @Column({
    name: 'preco',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  preco: number;

  @CreateDateColumn()
  criadoEm: Date;
}
