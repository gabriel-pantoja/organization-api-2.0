import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Injectable()
export class ContaDomanin {
  constructor(
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
  ) {}

  async listar(request: Request) {
    return await this.debitoCompartilhadoUsuarioService.listarConta(request);
  }
}
