import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';

export class LinkedUserGroupDto {
  id: number;
  userId: number;
  userName: string;
  groupId: number;

  static toDto(data: LinkedUserGroup): LinkedUserGroupDto {
    const dto = new LinkedUserGroupDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.userName = data.user.userName;
    dto.groupId = data.groupId;
    return dto;
  }

  static toSelectDto(data: LinkedUserGroup): LinkedUserGroupDto {
    const dto = new LinkedUserGroupDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.userName = data.user.userName;

    return dto;
  }
}
