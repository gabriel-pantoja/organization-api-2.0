import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';

export class LinkedDebtUserDto {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  debtId: number;
  isPay: boolean;

  static toDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.firstName = data.user.firstName;
    dto.lastName = data.user.lastName;
    dto.email = data.user.email;
    dto.debtId = data.debtId;
    dto.isPay = data.isPay;
    return dto;
  }

  static toSelectDto(data: LinkedDebtUser): LinkedDebtUserDto {
    const dto = new LinkedDebtUserDto();

    dto.id = data.id;
    dto.userId = data.userId;
    dto.email = data.user.email;
    dto.isPay = data.isPay;
    return dto;
  }
}
