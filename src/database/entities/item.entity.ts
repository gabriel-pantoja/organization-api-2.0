import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Produto } from './produto.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'marca', type: 'varchar', length: 50 })
  marca: string;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.item, {
    nullable: false,
  })
  usuario: Usuario;

  @OneToMany(() => Produto, (produto) => produto.item, {
    cascade: true,
  })
  produto: Produto[];

  @CreateDateColumn()
  criadoEm: Date;
}
