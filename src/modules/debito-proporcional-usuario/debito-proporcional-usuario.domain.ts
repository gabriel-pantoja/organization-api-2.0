import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DebitoProporcionalUsuarioService } from './debito-proporcional-usuario.service';
import { DebitoCompartilhadoService } from '../debito-compartilhado/debito-compartilhado.service';
import { DebitoProporcionalUsuarioPost } from './request/debito-proporcional-usuario.post';

@Injectable()
export class DebitoProporcionalUsuarioDomain {
  constructor(
    private readonly debitoProporcionalUsuarioService: DebitoProporcionalUsuarioService,
  ) {}

  async add(body: DebitoProporcionalUsuarioPost) {
    return await this.debitoProporcionalUsuarioService.add(body);
  }
}
