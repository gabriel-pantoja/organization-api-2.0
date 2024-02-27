import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VinculoCompraProduto } from './vinculo-compra-produto.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'marca', type: 'varchar', length: 50 })
  marca: string;

  @OneToMany(
    () => VinculoCompraProduto,
    (vinculoCompraProduto) => vinculoCompraProduto.produto,
    {
      cascade: true,
    },
  )
  vinculoCompraProduto: VinculoCompraProduto[];

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    nullable: false,
  })
  usuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
