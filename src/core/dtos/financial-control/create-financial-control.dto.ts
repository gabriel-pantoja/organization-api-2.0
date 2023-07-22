import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFinancialControlDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formPayment: string;

  @ApiProperty({ example: null })
  // @IsBoolean()
  hasPay: boolean;

  @ApiProperty({ example: '2023-04-27' })
  @IsNotEmpty()
  datePayment: Date;
}
