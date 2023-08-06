import { PartialType } from '@nestjs/swagger';
import { CreateLinkedFriendDto } from './create-linked-friend.dto';

export class UpdateLinkedFriendDto extends PartialType(CreateLinkedFriendDto) {}
