import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { VinculoDebitoUsuario } from './vinculo-debito-usuario.entity';

@Entity()
export class Debito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'responsavelId' })
  responsavelId: number;

  @ManyToOne(() => Usuario, (responsavel) => responsavel.debito, {
    nullable: false,
  })
  responsavel: Usuario;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  valor: number;

  @Column({ name: 'vencimento', type: 'date' })
  vencimento: Date;

  @Column({ name: 'referenteMesAno', type: 'varchar', length: 10 })
  referenteMesAno: string;

  @Column({ name: 'pago', type: 'bool', default: false })
  pago: boolean;

  @OneToMany(
    () => VinculoDebitoUsuario,
    (vinculoDebitoUsuario) => vinculoDebitoUsuario.debito,
    {
      cascade: true,
    },
  )
  vinculoDebitoUsuario: VinculoDebitoUsuario[];

  @Column({ name: 'criadoPorUsuarioId' })
  criadoPorUsuarioId: number;

  @ManyToOne(() => Usuario, (criadorPor) => criadorPor.debito, {
    nullable: false,
  })
  criadoPorUsuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
