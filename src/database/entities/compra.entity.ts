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
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.compra, {
    cascade: true,
  })
  produto: Produto[];

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.compra, {
    nullable: false,
  })
  usuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
