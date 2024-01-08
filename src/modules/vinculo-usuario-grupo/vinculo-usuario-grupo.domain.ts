import { Injectable } from '@nestjs/common';
import { VinculoUsuarioGrupoPost } from './request/vinculo-usuario-grupo.post';
import { VinculoUsuarioGrupoPut } from './request/vinculo-usuario-grupo.put';
import { VinculoUsuarioGrupoService } from './vinculo-usuario-grupo.service';

@Injectable()
export class VinculoUsuarioGrupoDomain {
  constructor(private vinculoUsuarioGrupoService: VinculoUsuarioGrupoService) {}

  async criar(body: VinculoUsuarioGrupoPost) {
    return await this.vinculoUsuarioGrupoService.criar(body);
  }

  async listar() {
    return await this.vinculoUsuarioGrupoService.listar();
  }

  async listarPorGrupoId(grupoId: number) {
    return await this.vinculoUsuarioGrupoService.listarPorGrupoId(grupoId);
  }

  async obterPorId(id: number) {
    return await this.vinculoUsuarioGrupoService.obterPorId(id);
  }

  async editar(id: number, body: VinculoUsuarioGrupoPut) {
    return await this.vinculoUsuarioGrupoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.vinculoUsuarioGrupoService.deletar(id);
  }
}
