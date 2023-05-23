import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Apto' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
