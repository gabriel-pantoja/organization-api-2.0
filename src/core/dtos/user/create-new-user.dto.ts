import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PlanEnum } from 'src/core/enums/plan.enum';
import validator from 'validator';

export class CreateNewUserDto {
  @ApiProperty({ example: 'Gabriel' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  firstName: string;

  @ApiProperty({ example: 'Pantoja' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => validator.trim(value))
  lastName: string;

  @ApiProperty({ example: 'pantoja@pantoja.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => validator.trim(value))
  email: string;

  @ApiProperty({ enum: PlanEnum })
  planId: PlanEnum;

  @ApiProperty({ example: 'null' })
  userId: number;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formPayment: string;
}
