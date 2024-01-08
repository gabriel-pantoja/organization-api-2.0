import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Debito } from './debito.entity';

@Entity()
export class TipoDebito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @OneToMany(() => Debito, (debito) => debito.tipoDebito)
  debito: Debito[];
}
