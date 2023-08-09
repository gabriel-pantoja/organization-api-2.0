import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DebtType } from './debt-type.entity';
import { User } from './user.entity';
import { LinkedDebtUser } from './linked-debt-user.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: true })
  debtTypeId: number;

  @ManyToOne(() => DebtType, (debtType) => debtType.debt)
  debtType: DebtType;

  @Column({ name: 'responsibleId' })
  responsibleId: number;

  @ManyToOne(() => User, (user) => user.debt, { nullable: false })
  responsible: User;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ name: 'payDate', type: 'date' })
  payDate: Date;

  @Column({ name: 'dateMonthAndYear', type: 'varchar', length: 10 })
  dateMonthAndYear: string;

  @Column({ name: 'isPay', type: 'bool', default: false })
  isPay: boolean;

  @OneToMany(() => LinkedDebtUser, (linkedDebtUser) => linkedDebtUser.debt, {
    cascade: true,
  })
  linkedDebtUser: LinkedDebtUser[];

  @Column({ name: 'creatorUserId' })
  creatorUserId: number;

  @ManyToOne(() => User, (user) => user.debt, { nullable: false })
  creatorUser: User;

  @CreateDateColumn()
  createdAt: Date;
}
