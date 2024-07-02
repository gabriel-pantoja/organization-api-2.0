import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class DebitoProporcionalUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'sobrenome', type: 'varchar', length: 50 })
  sobrenome: string;

  @Column({
    name: 'salario',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  salario: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.debitoProporcionalUsuario, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
