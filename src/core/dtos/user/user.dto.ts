import { ApiProperty } from '@nestjs/swagger';
import { Debt } from 'src/data/entities/debt.entity';
import { User } from 'src/data/entities/user.entity';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;

  static toSelectDto(data: User): UserDto {
    const dto = new UserDto();

    dto.id = data.id;
    dto.firstName = data.firstName;
    dto.lastName = data.lastName;
    dto.email = data.email;

    return dto;
  }
}
