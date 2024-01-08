import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MensalidadePost {
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({ example: 'pix' })
  @IsString()
  @IsNotEmpty()
  formaPagamento: string;

  @ApiProperty({ example: null })
  // @IsBoolean()
  pago: boolean;

  @ApiProperty({ example: '2023-04-27' })
  @IsNotEmpty()
  vencimento: Date;
}
