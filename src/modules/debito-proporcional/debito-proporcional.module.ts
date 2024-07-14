import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoProporcionalController } from './debito-proporcional.controller';
import { DebitoProporcionalDomain } from './debito-proporcional.domain';
import { DebitoProporcionalService } from './debito-proporcional.service';
import { DebitoProporcional } from 'src/database/entities/debito-proporcional';
import { UsuarioVinculadoDebitoProporcional } from 'src/database/entities/usuario-vinculado-debito-proporcional.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DebitoProporcional,
      UsuarioVinculadoDebitoProporcional,
    ]),
  ],
  controllers: [DebitoProporcionalController],
  providers: [DebitoProporcionalDomain, DebitoProporcionalService],
})
export class DebitoProporcionalModule {}
