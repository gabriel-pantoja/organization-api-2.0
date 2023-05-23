import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';

@Entity()
export class LinkedUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.linkedUserGroup)
  user: User;

  @Column()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.linkedUserGroup)
  group: Group;
}
