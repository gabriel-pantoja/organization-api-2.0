import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { VinculoCompraProduto } from './vinculo-compra-produto.entity';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.compra, {
    nullable: false,
  })
  usuario: Usuario;

  @OneToMany(
    () => VinculoCompraProduto,
    (vinculoCompraProduto) => vinculoCompraProduto.compra,
    {
      cascade: true,
    },
  )
  vinculoCompraProduto: VinculoCompraProduto[];

  @CreateDateColumn()
  criadoEm: Date;
}
