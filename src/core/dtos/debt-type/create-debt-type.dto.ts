import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDebtTypeDto {
  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
