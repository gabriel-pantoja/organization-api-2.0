import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';
import { Compra } from './compra.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number;

  @ManyToOne(() => Item, (item) => item.produto, {
    nullable: false,
  })
  item: Item;

  @Column({ name: 'unidade-peso' })
  unidadePeso: number;

  @Column({
    name: 'preco',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  preco: number;

  @Column()
  compraId: number;

  @ManyToOne(() => Compra, (compra) => compra.produto, {
    nullable: false,
  })
  compra: Compra;
}
