import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
import { Profile } from './profile.entity';
import { ProfileIdEnum } from 'src/core/enums/profile.enum';
import { FinancialControl } from './financial-control.entity';

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

  @OneToMany(
    () => FinancialControl,
    (financialControl) => financialControl.user,
  )
  financialControl: FinancialControl[];

  @Column({ default: null, nullable: true })
  planId: number;

  @ManyToOne(() => Plan, (plan) => plan.user)
  plan?: Plan;

  // @Column({
  //   type: 'enum',
  //   enum: ProfileIdEnum,
  //   default: ProfileIdEnum.User,
  // })
  // profileId: ProfileIdEnum;

  @Column('int')
  profileId: ProfileIdEnum;

  @ManyToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Column({ default: null, nullable: true })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  users?: User[];

  @Column({ name: 'active', type: 'bool', default: false })
  active: boolean;

  @Column({ name: 'lastAccess', type: 'datetime', nullable: true })
  lastAccess: Date;

  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn({
  //   name: 'updated_at',
  //   type: 'timestamptz',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;
}
