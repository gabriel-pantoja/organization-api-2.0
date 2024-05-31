import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { options } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: '.env.prod',
    }),
    TypeOrmModule.forRoot(options),
  ],
})
export class DatabaseModule {}
