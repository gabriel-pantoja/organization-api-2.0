import { PartialType } from '@nestjs/swagger';
import { CreateLinkedDebtUserDto } from './create-linked-debt-user.dto';

export class UpdateLinkedDebtUserDto extends PartialType(
  CreateLinkedDebtUserDto,
) {}
