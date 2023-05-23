import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Debt } from './debt.entity';

@Entity()
export class LinkedDebtUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.linkedDebtUser)
  user: User;

  @Column()
  debtId: number;

  @ManyToOne(() => Debt, (debt) => debt.linkedDebtUser)
  debt: Debt;
}
