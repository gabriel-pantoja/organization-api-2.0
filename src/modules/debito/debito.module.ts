import { Module } from '@nestjs/common';
import { DebitoService } from './debito.service';
import { DebitoController } from './debito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debito } from 'src/database/entities/debito.entity';
import { VinculoDebitoUsuarioService } from 'src/modules/vinculo-debito-usuario/vinculo-debito-usuario.service';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { DebitoDomain } from './debito.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Debito, VinculoDebitoUsuario])],
  controllers: [DebitoController],
  providers: [DebitoService, VinculoDebitoUsuarioService, DebitoDomain],
})
export class DebitoModule {}
