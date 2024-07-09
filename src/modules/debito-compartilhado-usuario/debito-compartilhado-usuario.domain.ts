import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DebitoCompartilhadoService } from '../debito-compartilhado/debito-compartilhado.service';
import { EditarValorDescontadoPut } from './request/editar-valor-descontado';
import { DebitoCompartilhadoUsuarioPost } from './request/debito-compartilhado-usuario.post';
import { DebitoCompartilhadoUsuarioService } from './debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioPut } from './request/debito-compartilhado-usuario.put';

@Injectable()
export class DebitoCompartilhadoUsuarioDomain {
  constructor(
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
    private readonly debitoCompartilhadoService: DebitoCompartilhadoService,
  ) {}

  async criar(body: DebitoCompartilhadoUsuarioPost) {
    return await this.debitoCompartilhadoUsuarioService.criar(body);
  }

  async listar(request: Request) {
    return await this.debitoCompartilhadoUsuarioService.listar(request);
  }

  async listarPorDebitoId(debitoId: number) {
    return await this.debitoCompartilhadoUsuarioService.listarPorDebitoId(
      debitoId,
    );
  }

  async obterPorId(id: number): Promise<DebitoCompartilhadoUsuario> {
    return await this.debitoCompartilhadoUsuarioService.obterPorId(id);
  }

  async obterPorUsuarioId(
    usuarioId: number,
  ): Promise<DebitoCompartilhadoUsuario | null> {
    return await this.debitoCompartilhadoUsuarioService.obterPorUsuarioId(
      usuarioId,
    );
  }

  async editar(id: number, body: DebitoCompartilhadoUsuarioPut) {
    // const debitoCompartilhado =
    //   await this.debitoCompartilhadoService.obterPorId(
    //     body.debitoCompartilhadoId,
    //   );
    // if (debitoCompartilhado.debitoCompartilhadoUsuarioVinculado.length == 1) {
    //   debitoCompartilhado.pago = body.pago;
    //   await this.debitoCompartilhadoService.editar(
    //     body.debitoCompartilhadoId,
    //     debitoCompartilhado,
    //   );
    // }
    return await this.debitoCompartilhadoUsuarioService.editar(id, body);
  }

  async editarValorDescontado(id: number, body: EditarValorDescontadoPut) {
    const debitoCompartilhadoUsuarioVinculado =
      await this.debitoCompartilhadoUsuarioService.obterPorId(id);
    debitoCompartilhadoUsuarioVinculado.valorDescontado =
      Number(body.valorDescontado) +
      Number(debitoCompartilhadoUsuarioVinculado.valorDescontado);
    return await this.debitoCompartilhadoUsuarioService.editar(
      id,
      debitoCompartilhadoUsuarioVinculado,
    );
  }

  async deletar(id: number) {
    return await this.debitoCompartilhadoUsuarioService.deletar(id);
  }

  async deletarPorUsuarioId(usuarioId: number) {
    return await this.debitoCompartilhadoUsuarioService.deletarPorUsuarioId(
      usuarioId,
    );
  }
}
