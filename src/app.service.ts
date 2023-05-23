import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    const mode: string = process.env.NODE_ENV;
    const database: string = process.env.DB_HOST;

    return { mode, database };
  }
}
