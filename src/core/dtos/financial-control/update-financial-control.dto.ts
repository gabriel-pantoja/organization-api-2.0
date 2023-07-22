import { PartialType } from '@nestjs/swagger';
import { CreateFinancialControlDto } from './create-financial-control.dto';

export class UpdateFinancialControlDto extends PartialType(
  CreateFinancialControlDto,
) {}
