import { User } from 'src/data/entities/user.entity';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;

  static toGetDto(data: User): UserDto {
    const dto = new UserDto();

    if (data) {
      dto.id = data.id;
      dto.firstName = data.firstName;
      dto.lastName = data.lastName;
      dto.email = data.email;
    }

    return dto;
  }

  static toGetByIdDto(data: User): UserDto {
    const dto = new UserDto();

    if (data) {
      dto.id = data.id;
      dto.firstName = data.firstName;
      dto.lastName = data.lastName;
      dto.email = data.email;
    }

    return dto;
  }

  static toGetSelectDto(data: User): UserDto {
    const dto = new UserDto();

    if (data) {
      dto.id = data.id;
      dto.firstName = data.firstName;
      dto.lastName = data.lastName;
      dto.email = data.email;
    }

    return dto;
  }

  static toGetFriendDto(data: User): UserDto {
    const dto = new UserDto();

    if (data) {
      dto.id = data.id;
      dto.firstName = data.firstName;
      dto.lastName = data.lastName;
      dto.email = data.email;
    }

    return dto;
  }
}
