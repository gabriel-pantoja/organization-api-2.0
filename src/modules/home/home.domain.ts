import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { MeuDebitoService } from '../meu-debito/meu-debito.service';

@Injectable()
export class HomeDomanin {
  constructor(
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
    private readonly meuDebitoService: MeuDebitoService,
  ) {}

  async listar(request: Request) {
   const debitoCompartilhadoList =  await this.debitoCompartilhadoUsuarioService.home(request);
   const meuDebitoList =  await this.meuDebitoService.home(request);

    return {
      debitoCompartilhado: debitoCompartilhadoList,
      meuDebito: meuDebitoList
    }
  }
}
