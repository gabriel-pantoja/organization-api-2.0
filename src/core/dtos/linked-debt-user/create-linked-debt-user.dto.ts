import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateLinkedDebtUserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  debtId: number;

  @ApiProperty({ example: null })
  @IsBoolean()
  isPay: boolean;
}
