import { Group } from 'src/data/entities/group.entity';
import { LinkedUserGroupDto } from '../linked-user-group/linked-user-group.dto';

export class GroupDto {
  id: number;
  name: string;
  linkedUserGroup: LinkedUserGroupDto[] = [];
  createdAt: Date;

  static toDto(data: Group): GroupDto {
    const dto = new GroupDto();

    dto.id = data.id;
    dto.name = data.name;
    dto.linkedUserGroup = data.linkedUserGroup.map((x) => {
      return LinkedUserGroupDto.toDto(x);
    });
    dto.createdAt = data.createdAt;

    return dto;
  }
}
