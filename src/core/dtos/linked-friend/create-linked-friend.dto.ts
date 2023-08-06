import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLinkedFriendDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  friendId: number;
}
