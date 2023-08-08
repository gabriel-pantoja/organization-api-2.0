import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';
import { UserDto } from '../user/user.dto';

export class LinkedDebtUserDto {
  id: number;
  userId: number;
  user: UserDto;
  debtId: number;
  isPay: boolean;

  static toDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.user = data.user;
    dto.debtId = data.debtId;
    dto.isPay = data.isPay;
    return dto;
  }

  static toSelectDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.user = data.user;
    dto.isPay = data.isPay;
    return dto;
  }
}
