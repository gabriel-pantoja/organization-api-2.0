import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
import { DebitoCompartilhadoUsuario } from './debito-compartilhado-usuario.entity';
import { DebitoProporcionalUsuario } from './debito-proporcional-usuario.entity';

@Entity()
export class DebitoCompartilhado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ default: 1 })
  categoriaId: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.debitoCompartilhado, {
    nullable: false,
  })
  categoria: Categoria;

  @Column({ name: 'responsavelId' })
  responsavelId: number;

  @ManyToOne(() => Usuario, (responsavel) => responsavel.debitoCompartilhado, {
    nullable: false,
  })
  responsavel: Usuario;

  @Column({
    name: 'valor',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  valor: number;

  @Column({ name: 'vencimento', type: 'date', nullable: true })
  vencimento: Date;

  @Column({
    name: 'referenteMesAno',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  referenteMesAno: string;

  @Column({ name: 'pago', type: 'bool', nullable: true, default: null })
  pago: boolean;

  @OneToMany(
    () => DebitoCompartilhadoUsuario,
    (debitoCompartilhadoUsuario) =>
      debitoCompartilhadoUsuario.debitoCompartilhado,
    {
      cascade: true,
    },
  )
  debitoCompartilhadoUsuario: DebitoCompartilhadoUsuario[];

  @Column({ name: 'criadoPorUsuarioId' })
  criadoPorUsuarioId: number;

  @ManyToOne(() => Usuario, (criadorPor) => criadorPor.debitoCompartilhado, {
    nullable: false,
  })
  criadoPorUsuario: Usuario;

  @CreateDateColumn()
  criadoEm: Date;
}
