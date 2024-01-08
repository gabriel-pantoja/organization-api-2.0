import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ContaService } from './conta.service';

@Injectable()
export class ContaDomanin {
  constructor(private readonly contaService: ContaService) {}

  async listar(request: Request) {
    return await this.contaService.listar(request);
  }
}
