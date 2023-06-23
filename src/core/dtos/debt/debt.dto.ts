import { ApiProperty } from '@nestjs/swagger';
import { Debt } from 'src/data/entities/debt.entity';
import { LinkedDebtUserDto } from '../linked-debt-user/linked-debt-user.dto';

export class DebtDto {
  id: number;
  debtTypeId: number;
  debtTypeName: string;
  userId: number;
  userName: string;
  price: number;
  payDate: Date;
  dateMonthAndYear: string;
  isPay: boolean;
  linkedDebtUser: LinkedDebtUserDto[] = [];
  createdAt: Date;

  static toDto(data: Debt): DebtDto {
    const dto = new DebtDto();

    dto.id = data.id;
    dto.debtTypeId = data.debtType.id;
    dto.debtTypeName = data.debtType.name;
    dto.userId = data.user.id;
    dto.userName = data.user.userName;
    dto.price = data.price;
    dto.payDate = data.payDate;
    dto.dateMonthAndYear = data.dateMonthAndYear;
    dto.isPay = data.isPay;
    dto.linkedDebtUser = data.linkedDebtUser.map((x) => {
      return LinkedDebtUserDto.toDto(x);
    });
    dto.createdAt = data.createdAt;

    return dto;
  }
}
