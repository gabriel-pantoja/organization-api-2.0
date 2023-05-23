import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Debt } from './debt.entity';

@Entity()
export class DebtType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Debt, (debt) => debt.debtType)
  debt: Debt[];
}
