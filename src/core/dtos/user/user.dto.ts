import { ApiProperty } from '@nestjs/swagger';
import { Debt } from 'src/data/entities/debt.entity';
import { User } from 'src/data/entities/user.entity';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdAt: Date;

  static toSelectDto(data: User): UserDto {
    const dto = new UserDto();

    dto.id = data.id;
    dto.userName = data.userName;

    return dto;
  }
}
