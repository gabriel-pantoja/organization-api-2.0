import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, isNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Gabriel' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Pantoja' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'pantoja@pantoja.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'null' })
  planId: number;
}
