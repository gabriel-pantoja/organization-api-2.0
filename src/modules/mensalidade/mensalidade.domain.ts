import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { MensalidadeService } from './mensalidade.service';

@Injectable()
export class MensalidadeDomain {
  constructor(private readonly mensalidadeService: MensalidadeService) {}

  async listar(request: Request) {
    return await this.mensalidadeService.listar(request);
  }
}
