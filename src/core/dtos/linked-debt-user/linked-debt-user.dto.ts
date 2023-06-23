import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';

export class LinkedDebtUserDto {
  id: number;
  userId: number;
  userName: string;
  debtId: number;
  isPay: boolean;

  static toDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.userName = data.user.userName;
    dto.debtId = data.debtId;
    dto.isPay = data.isPay;
    return dto;
  }

  static toSelectDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.userName = data.user.userName;
    dto.isPay = data.isPay;
    return dto;
  }
}
