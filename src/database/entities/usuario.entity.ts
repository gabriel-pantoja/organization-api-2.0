import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Debito } from './debito.entity';
import { VinculoDebitoUsuario } from './vinculo-debito-usuario.entity';
import { Plano } from './plano.entity';
import { Perfil } from './perfil.entity';
import { EPerfil } from 'src/core/enums/perfil.enum';
import { Mensalidade } from './mensalidade.entity';
import { VinculoAmigo } from './vinculo-amigo.entity';
import { Item } from './item.entity';
import { Compra } from './compra.entity';

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

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.Admin,
  // })
  // role: Role;

  @OneToMany(
    () => VinculoDebitoUsuario,
    (vinculoDebitoUsuario) => vinculoDebitoUsuario.usuario,
    {
      cascade: true,
    },
  )
  vinculoDebitoUsuario: VinculoDebitoUsuario[];

  @OneToMany(() => Debito, (debito) => debito.responsavel)
  debito: Debito[];

  @OneToMany(() => Mensalidade, (mensalidade) => mensalidade.usuario, {
    cascade: true,
  })
  mensalidade: Mensalidade[];

  @OneToMany(() => Item, (item) => item.usuario, {
    cascade: true,
  })
  item: Item[];

  @OneToMany(() => Compra, (compra) => compra.usuario, {
    cascade: true,
  })
  compra: Compra[];

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
  perfilId: EPerfil;

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

  @OneToMany(() => VinculoAmigo, (vinculoAmigo) => vinculoAmigo.usuario, {
    cascade: true,
  })
  vinculoAmigo: VinculoAmigo[];

  @CreateDateColumn()
  criadoEm: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;
}
