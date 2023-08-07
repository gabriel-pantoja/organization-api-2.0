import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PlanEnum } from 'src/core/enums/plan.enum';

export class JoinPlanDto {
  @ApiProperty({ enum: PlanEnum })
  planId: PlanEnum;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formPayment: string;
}
