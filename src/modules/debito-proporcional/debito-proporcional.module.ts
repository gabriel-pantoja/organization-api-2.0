import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebitoProporcionalController } from './debito-proporcional.controller';
import { DebitoProporcionalDomain } from './debito-proporcional.domain';
import { DebitoProporcionalService } from './debito-proporcional.service';
import { DebitoProporcional } from 'src/database/entities/debito-proporcional';

@Module({
  imports: [TypeOrmModule.forFeature([DebitoProporcional])],
  controllers: [DebitoProporcionalController],
  providers: [DebitoProporcionalDomain, DebitoProporcionalService],
})
export class DebitoProporcionalModule {}
