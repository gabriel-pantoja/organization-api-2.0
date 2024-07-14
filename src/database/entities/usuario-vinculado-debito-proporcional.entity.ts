import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class UsuarioVinculadoDebitoProporcional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(
    () => Usuario,
    (usuario) => usuario.usuarioVinculadoDebitoProporcional,
    {
      onDelete: 'CASCADE',
    },
  )
  usuario: Usuario;

  @Column()
  usuarioVinculadoId: number;

  @ManyToOne(
    () => Usuario,
    (usuarioVinculado) => usuarioVinculado.usuarioVinculadoDebitoProporcional,
    {
      onDelete: 'CASCADE',
    },
  )
  usuarioVinculado: Usuario;
}
