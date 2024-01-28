import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Debito } from './debito.entity';

@Entity()
export class VinculoDebitoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.vinculoDebitoUsuario, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @Column()
  debitoId: number;

  @ManyToOne(() => Debito, (debito) => debito.vinculoDebitoUsuario, {
    onDelete: 'CASCADE',
  })
  debito: Debito;

  @Column({ name: 'pago', type: 'bool', nullable: true, default: null })
  pago: boolean;
}
