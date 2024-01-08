import { Injectable } from '@nestjs/common';
import { TipoDebitoPost } from './request/tipo-debito.post';
import { Request } from 'express';
import { TipoDebitoPut } from './request/tipo-debito.put';
import { TipoDebitoService } from './tipo-debito.service';

@Injectable()
export class TipoDebitoDomain {
  constructor(private readonly tipoDebitoService: TipoDebitoService) {}

  async criar(body: TipoDebitoPost) {
    return await this.tipoDebitoService.criar(body);
  }

  async listar(request: Request): Promise<any> {
    return await this.tipoDebitoService.listar(request);
  }

  async obterPorId(id: number): Promise<any> {
    return await this.tipoDebitoService.obterPorId(id);
  }

  async editar(id: number, body: TipoDebitoPut) {
    return await this.tipoDebitoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.tipoDebitoService.deletar(id);
  }
}
