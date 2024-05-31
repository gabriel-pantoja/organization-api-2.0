import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { EFriendStatus } from 'src/core/enums/friend-status.enum';

@Entity()
export class VinculoAmigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.vinculoAmigo)
  usuario: Usuario;

  @Column()
  amigoId: number;

  @ManyToOne(() => Usuario, (amigo) => amigo.vinculoAmigo)
  amigo: Usuario;

  @Column('int')
  status: number;
}
