import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinkedUserGroup } from './linked-user-group.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => LinkedUserGroup, (linkedUserGroup) => linkedUserGroup.group)
  linkedUserGroup: LinkedUserGroup[];
}
