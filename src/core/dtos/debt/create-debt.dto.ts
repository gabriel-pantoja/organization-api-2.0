import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  debtTypeId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '203-04-27' })
  @IsNotEmpty()
  payDate: Date;

  @ApiProperty({ example: '04-2023' })
  @IsString()
  @IsNotEmpty()
  dateMonthAndYear: string;

  @ApiProperty({ example: null })
  isPay: boolean;
}
