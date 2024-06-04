import { Injectable } from '@nestjs/common';
import { DebitoCompartilhadoUsuarioPost } from './request/debito-compartilhado-usuario.post';
import { DebitoCompartilhadoUsuarioPut } from './request/debito-compartilhado-usuario.put';
import { Request } from 'express';
import { DebitoCompartilhadoUsuarioService } from './debito-compartilhado-usuario.service';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';

@Injectable()
export class DebitoCompartilhadoUsuarioDomain {
  constructor(
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
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
    return await this.debitoCompartilhadoUsuarioService.editar(id, body);
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
