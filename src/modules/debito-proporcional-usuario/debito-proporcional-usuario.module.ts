import { Module } from '@nestjs/common';
import { DebitoProporcionalUsuarioService } from './debito-proporcional-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoPropocionalUsuarioController } from './debito-proporcional-usuario.controller';
import { DebitoProporcionalUsuarioDomain } from './debito-proporcional-usuario.domain';
import { DebitoProporcionalUsuario } from 'src/database/entities/debito-proporcioal-usuario';

@Module({
  imports: [
    TypeOrmModule.forFeature([DebitoProporcionalUsuario]),
  ],
  controllers: [DebitoPropocionalUsuarioController],
  providers: [
    DebitoProporcionalUsuarioService,
    DebitoProporcionalUsuarioDomain,
  ],
})
export class DebitoProporcionalUsuarioModule {}
