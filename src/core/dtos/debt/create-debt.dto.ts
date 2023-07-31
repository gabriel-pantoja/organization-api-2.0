import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { LinkedDebtUserDto } from '../linked-debt-user/linked-debt-user.dto';
import { Transform } from 'class-transformer';
import validator from 'validator';

export class CreateDebtDto {
  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  name: string;

  // @ApiProperty({ example: '1' })
  // @IsNumber()
  // @IsNotEmpty()
  // debtTypeId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '2023-04-27' })
  @IsNotEmpty()
  payDate: Date;

  @ApiProperty({ example: '04-2023' })
  @IsString()
  @IsNotEmpty()
  dateMonthAndYear: string;

  @ApiProperty({ example: null })
  // @IsBoolean()
  isPay: boolean;

  @ApiProperty({ example: 'Usuários' })
  @IsArray()
  linkedDebtUser: LinkedDebtUserDto[];
}
