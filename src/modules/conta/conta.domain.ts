import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';

@Injectable()
export class ContaDomanin {
  constructor(
    private readonly vinculoDebitoUsuarioService: VinculoDebitoUsuarioService,
  ) {}

  async listar(request: Request) {
    return await this.vinculoDebitoUsuarioService.listarConta(request);
  }
}
