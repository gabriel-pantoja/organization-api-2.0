import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DebitoCompartilhado } from './debito-compartilhado.entity';
import { Plano } from './plano.entity';
import { Perfil } from './perfil.entity';
import { Mensalidade } from './mensalidade.entity';
import { Compra } from './compra.entity';
import { MeuDebito } from './meu-debito.entity';
import { Produto } from './produto.entity';
import { DebitoProporcional } from './debito-proporcional';
import { DebitoCompartilhadoUsuario } from './debito-compartilhado-usuario.entity';
import { DebitoProporcionalUsuario } from './debito-proporcional-usuario.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'sobrenome', type: 'varchar', length: 50 })
  sobrenome: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  @Unique('Duplicate email', ['email'])
  email: string;

  @Column({
    name: 'senha',
    type: 'varchar',
    length: 100,
    default: null,
    nullable: true,
  })
  senha?: string;

  @Column({
    name: 'salario',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: null,
    nullable: true,
  })
  salario: number;

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.Admin,
  // })
  // role: Role;

  @OneToMany(
    () => DebitoCompartilhado,
    (debitoCompartilhado) => debitoCompartilhado.responsavel,
  )
  debitoCompartilhado: DebitoCompartilhado[];

  @OneToMany(() => Mensalidade, (mensalidade) => mensalidade.usuario, {
    cascade: true,
  })
  mensalidade: Mensalidade[];

  @OneToMany(() => Compra, (compra) => compra.usuario, {
    cascade: true,
  })
  compra: Compra[];

  @OneToMany(() => Produto, (produto) => produto.usuario, {
    cascade: true,
  })
  produto: Produto[];

  @OneToMany(() => MeuDebito, (meuDebito) => meuDebito.usuario, {
    cascade: false,
  })
  meuDebito: MeuDebito[];

  @OneToMany(
    () => DebitoCompartilhadoUsuario,
    (debitoCompartilhadoUsuario) => debitoCompartilhadoUsuario.usuario,
    {
      cascade: false,
    },
  )
  debitoCompartilhadoUsuario: DebitoCompartilhadoUsuario[];

  @OneToMany(
    () => DebitoProporcional,
    (debitoProporcional) => debitoProporcional.usuario,
    {
      cascade: false,
    },
  )
  debitoProporcional: DebitoProporcional[];

  @OneToMany(
    () => DebitoProporcionalUsuario,
    (debitoProporcionalUsuario) => debitoProporcionalUsuario.usuario,
    {
      cascade: false,
    },
  )
  debitoProporcionalUsuario: DebitoProporcionalUsuario[];

  @Column({ default: null, nullable: true })
  planoId: number;

  @ManyToOne(() => Plano, (plano) => plano.usuario)
  plano?: Plano;

  // @Column({
  //   type: 'enum',
  //   enum: ProfileIdEnum,
  //   default: ProfileIdEnum.User,
  // })
  // profileId: ProfileIdEnum;

  @Column('int')
  perfilId: number;

  @ManyToOne(() => Perfil, (perfil) => perfil.usuario)
  perfil: Perfil;

  @Column({ default: null, nullable: true })
  usuarioId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuarios?: Usuario[];

  @Column({ name: 'ativo', type: 'bool', default: false })
  ativo: boolean;

  @Column({ name: 'ultimoAcesso', type: 'datetime', nullable: true })
  ultimoAcesso: Date;

  @CreateDateColumn()
  criadoEm: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;
}
