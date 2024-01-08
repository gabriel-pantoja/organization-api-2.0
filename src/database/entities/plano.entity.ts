import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => Usuario, (usuario) => usuario.plano)
  usuario: Usuario[];
}
