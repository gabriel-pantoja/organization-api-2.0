import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Mensalidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'formPayment', type: 'varchar', length: 10, nullable: true })
  formaPagamento: string;

  @Column({ name: 'hasPay', type: 'bool', nullable: true })
  pago: boolean;

  @Column()
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.mensalidade, { nullable: false })
  usuario: Usuario;

  @Column({ name: 'vencimento', type: 'datetime' })
  vencimento: Date;
}
