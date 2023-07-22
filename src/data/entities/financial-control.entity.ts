import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FinancialControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'formPayment', type: 'varchar', length: 10, nullable: true })
  formPayment: string;

  @Column({ name: 'hasPay', type: 'bool', nullable: true })
  hasPay: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.financialControl, { nullable: false })
  user: User;

  @Column({ name: 'datePayment', type: 'datetime' })
  datePayment: Date;
}
