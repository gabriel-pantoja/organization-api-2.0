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

  @Column({ name: 'pago', type: 'bool', nullable: true, default: null })
  pago: boolean;
}
