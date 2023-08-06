import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { FriendStatusEnum } from 'src/core/enums/friend-status.enum';

@Entity()
export class LinkedFriend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.linkedFriend)
  user: User;

  @Column()
  friendId: number;

  @ManyToOne(() => User, (user) => user.linkedFriend)
  friend: User;

  @Column('int')
  status: FriendStatusEnum;
}
