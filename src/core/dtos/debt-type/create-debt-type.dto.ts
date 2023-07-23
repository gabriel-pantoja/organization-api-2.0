import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import validator from 'validator';

export class CreateDebtTypeDto {
  @ApiProperty({ example: 'NET' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  name: string;
}
