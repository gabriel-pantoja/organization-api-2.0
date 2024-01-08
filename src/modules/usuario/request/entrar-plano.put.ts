import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { EPlano } from 'src/core/enums/plano.enum';

export class EntrarPlanoPut {
  @ApiProperty({ enum: EPlano })
  planoId: EPlano;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formaPagamento: string;
}
