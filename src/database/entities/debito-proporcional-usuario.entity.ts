import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DebitoProporcional } from './debito-proporcional';

@Entity()
export class DebitoProporcionalUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.debitoProporcionalUsuario, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @Column()
  debitoProporcionalId: number;

  @ManyToOne(
    () => DebitoProporcional,
    (debitoProporcional) => debitoProporcional.debitoProporcionalUsuario,
    {
      onDelete: 'CASCADE',
    },
  )
  debitoProporcional: DebitoProporcional;
}
