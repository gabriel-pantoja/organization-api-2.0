import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Grupo } from './grupo.entity';

@Entity()
export class VinculoUsuarioGrupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.vinculoUsuarioGrupo)
  usuario: Usuario;

  @Column()
  grupoId: number;

  @ManyToOne(() => Grupo, (grupo) => grupo.vinculoUsuarioGrupo, {
    onDelete: 'CASCADE',
  })
  grupo: Grupo;
}
