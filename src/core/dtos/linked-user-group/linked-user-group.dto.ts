import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

export class LinkedUserGroupDto {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  groupId: number;

  static toDto(data: LinkedUserGroup): LinkedUserGroupDto {
    const dto = new LinkedUserGroupDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.firstName = data.user.firstName;
    dto.lastName = data.user.lastName;
    dto.email = data.user.email;
    dto.groupId = data.groupId;
    return dto;
  }

  static toSelectDto(data: LinkedUserGroup): LinkedUserGroupDto {
    const dto = new LinkedUserGroupDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.firstName = data.user.firstName;
    dto.lastName = data.user.lastName;
    dto.email = data.user.email;

    return dto;
  }
}
