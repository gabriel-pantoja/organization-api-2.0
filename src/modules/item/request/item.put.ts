import { PartialType } from '@nestjs/swagger';
import { ItemPost } from './item.post';

export class ItemPut extends PartialType(ItemPost) {}
