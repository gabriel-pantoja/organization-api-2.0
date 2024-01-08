import { Injectable } from '@nestjs/common';
import { VinculoDebitoUsuarioPost } from './request/vinculo-debito-usuario.post';
import { VinculoDebitoUsuarioPut } from './request/vinculo-debito-usuario.put';
import { Request } from 'express';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';
import { VinculoDebitoUsuarioService } from './vinculo-debito-usuario.service';

@Injectable()
export class VinculoDebitoUsuarioDomain {
  constructor(
    private readonly vinculoDebitoUsuarioService: VinculoDebitoUsuarioService,
  ) {}

  async criar(body: VinculoDebitoUsuarioPost) {
    return await this.vinculoDebitoUsuarioService.criar(body);
  }

  async listar(request: Request) {
    return await this.vinculoDebitoUsuarioService.listar(request);
  }

  async listarPorDebitoId(debitoId: number) {
    return await this.vinculoDebitoUsuarioService.listarPorDebitoId(debitoId);
  }

  async obterPorId(id: number): Promise<VinculoDebitoUsuario> {
    return await this.vinculoDebitoUsuarioService.obterPorId(id);
  }

  async obterPorUsuarioId(
    usuarioId: number,
  ): Promise<VinculoDebitoUsuario | null> {
    return await this.vinculoDebitoUsuarioService.obterPorUsuarioId(usuarioId);
  }

  async editar(id: number, body: VinculoDebitoUsuarioPut) {
    return await this.vinculoDebitoUsuarioService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.vinculoDebitoUsuarioService.deletar(id);
  }

  async deletarPorUsuarioId(usuarioId: number) {
    return await this.vinculoDebitoUsuarioService.deletarPorUsuarioId(
      usuarioId,
    );
  }
}
