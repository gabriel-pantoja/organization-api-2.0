import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { LinkedUserGroupDto } from '../linked-user-group/linked-user-group.dto';

export class CreateGroupDto {
  @ApiProperty({ example: 'Apto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Usuários' })
  @IsArray()
  linkedUserGroup: LinkedUserGroupDto[];
}
