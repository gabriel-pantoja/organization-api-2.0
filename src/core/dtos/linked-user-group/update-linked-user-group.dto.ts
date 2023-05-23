import { PartialType } from '@nestjs/swagger';
import { CreateLinkedUserGroupDto } from './create-linked-user-group.dto';

export class UpdateLinkedUserGroupDto extends PartialType(
  CreateLinkedUserGroupDto,
) {}
