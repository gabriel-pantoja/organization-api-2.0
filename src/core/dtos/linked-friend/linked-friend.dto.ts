import { LinkedFriend } from 'src/data/entities/linked-friend.entity';
import { User } from 'src/data/entities/user.entity';
import { UserDto } from '../user/user.dto';

export class FriendDto {
  id: number;
  userId: number;
  friendId: number;
  status: number;
  user: UserDto;
  friend: UserDto;

  static toGetDto(data: LinkedFriend): FriendDto {
    const dto = new FriendDto();

    if (data) {
      dto.id = data.id;
      dto.userId = data.userId;
      dto.friendId = data.friendId;
      dto.status = data.status;
      dto.friend = new UserDto();
      dto.friend.id = data.friend.id;
      dto.friend.firstName = data.friend.firstName;
      dto.friend.lastName = data.friend.lastName;
      dto.friend.email = data.friend.email;
      dto.user = new UserDto();
      dto.user.id = data.user.id;
      dto.user.firstName = data.user.firstName;
      dto.user.lastName = data.user.lastName;
      dto.user.email = data.user.email;
    }

    return dto;
  }

  static toGetSelectDto(data: LinkedFriend): FriendDto {
    const dto = new FriendDto();

    if (data) {
      dto.id = data.id;
      dto.userId = data.userId;
      dto.friendId = data.friendId;
      dto.status = data.status;
      dto.friend = new UserDto();
      dto.friend.id = data.friend.id;
      dto.friend.firstName = data.friend.firstName;
      dto.friend.lastName = data.friend.lastName;
      dto.friend.email = data.friend.email;
      dto.user = new UserDto();
      dto.user.id = data.user.id;
      dto.user.firstName = data.user.firstName;
      dto.user.lastName = data.user.lastName;
      dto.user.email = data.user.email;
    }

    return dto;
  }
}
