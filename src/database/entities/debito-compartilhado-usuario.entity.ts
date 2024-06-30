import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DebitoCompartilhado } from './debito-compartilhado.entity';

@Entity()
export class DebitoCompartilhadoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.debitoCompartilhadoUsuario, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @Column()
  debitoCompartilhadoId: number;

  @ManyToOne(
    () => DebitoCompartilhado,
    (debitoCompartilhado) => debitoCompartilhado.debitoCompartilhadoUsuario,
    {
      onDelete: 'CASCADE',
    },
  )
  debitoCompartilhado: DebitoCompartilhado;

  @Column({
    name: 'valor',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  valor: number;

  @Column({
    name: 'valorDescontado',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  valorDescontado: number;

  @Column({ name: 'pago', type: 'bool', nullable: true, default: null })
  pago: boolean;
}
