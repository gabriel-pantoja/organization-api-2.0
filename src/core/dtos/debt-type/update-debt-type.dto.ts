import { PartialType } from '@nestjs/swagger';
import { CreateDebtTypeDto } from './create-debt-type.dto';

export class UpdateDebtTypeDto extends PartialType(CreateDebtTypeDto) {}
