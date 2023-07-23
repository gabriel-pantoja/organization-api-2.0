import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import validator from 'validator';

export class CreateUserDto {
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
}
