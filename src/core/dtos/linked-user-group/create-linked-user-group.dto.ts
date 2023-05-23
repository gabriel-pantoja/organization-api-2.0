import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateLinkedUserGroupDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  groupId: number;
}
