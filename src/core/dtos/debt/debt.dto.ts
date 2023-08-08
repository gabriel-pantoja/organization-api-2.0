import { ApiProperty } from '@nestjs/swagger';
import { Debt } from 'src/data/entities/debt.entity';
import { LinkedDebtUserDto } from '../linked-debt-user/linked-debt-user.dto';
import { UserDto } from '../user/user.dto';

export class DebtDto {
  id: number;
  name: string;
  // debtTypeId: number;
  userId: number;
  user: UserDto;
  price: number;
  payDate: Date;
  dateMonthAndYear: string;
  isPay: boolean;
  linkedDebtUser: LinkedDebtUserDto[] = [];
  createdAt: Date;

  static toDto(data: Debt): DebtDto {
    const dto = new DebtDto();

    dto.id = data.id;
    dto.name = data.name;
    // dto.debtTypeId = data.debtType.id;
    dto.userId = data.user.id;
    dto.user = data.user;
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
