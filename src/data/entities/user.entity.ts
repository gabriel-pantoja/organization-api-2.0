import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Debt } from './debt.entity';
import { LinkedUserGroup } from './linked-user-group.entity';
import { LinkedDebtUser } from './linked-debt-user.entity';
import { Plan } from './plan.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 50 })
  @Unique('Duplicate email', ['email'])
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    default: null,
    nullable: true,
  })
  password?: string;

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.Admin,
  // })
  // role: Role;

  @OneToMany(() => LinkedUserGroup, (linkedUserGroup) => linkedUserGroup.user)
  linkedUserGroup: LinkedUserGroup[];

  @OneToMany(() => LinkedDebtUser, (linkedDebtUser) => linkedDebtUser.user)
  linkedDebtUser: LinkedDebtUser[];

  @OneToMany(() => Debt, (debt) => debt.user)
  debt: Debt[];

  @Column({ default: null, nullable: true })
  planId: number;

  @ManyToOne(() => Plan, (plan) => plan.user)
  plan: Plan;

  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;
}
