import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VinculoUsuarioGrupo } from './vinculo-usuario-grupo.entity';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @CreateDateColumn()
  criadoEm: Date;

  @OneToMany(
    () => VinculoUsuarioGrupo,
    (vinculoUsuarioGrupo) => vinculoUsuarioGrupo.grupo,
    { cascade: true },
  )
  vinculoUsuarioGrupo: VinculoUsuarioGrupo[];
}
