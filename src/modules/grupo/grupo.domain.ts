import { Injectable, NotFoundException } from '@nestjs/common';
import { GrupoPost } from './request/grupo.post';
import { GrupoPut } from './request/grupo.put';
import { Request } from 'express';
import { GrupoService } from './grupo.service';
import { GrupoDto } from './dto/grupo.dto';
import { VinculoUsuarioGrupoService } from '../vinculo-usuario-grupo/vinculo-usuario-grupo.service';

@Injectable()
export class GrupoDomain {
  constructor(
    private grupoService: GrupoService,
    private vinculoUsuarioGrupoService: VinculoUsuarioGrupoService,
  ) {}

  async criar(body: GrupoPost) {
    return await this.grupoService.criar(body);
  }

  async listar(request: Request) {
    return await this.grupoService.listar(request);
  }

  async obterPorId(id: number) {
    return GrupoDto.listar(await this.grupoService.obterPorId(+id));
  }

  async editar(id: number, body: GrupoPut) {
    // const userIdAdd: number[] = [];
    // updateUserDto.linkedUserGroup.forEach((x) => {
    //   if (userIds.find((i) => i != x.userId)) {
    //     userIdAdd.push(x.userId);
    //   }
    //   if (!userIds.length) {
    //     userIdAdd.push(x.userId);
    //   }
    // });
    // userIdAdd.forEach(async (userId) => {
    //   const linkedUserGroup: CreateLinkedUserGroupDto = {
    //     groupId: +id,
    //     userId: userId,
    //   };
    //   await this.linkedUserGroupService.create(linkedUserGroup);
    // });

    const data = await this.vinculoUsuarioGrupoService.listarPorGrupoId(+id);

    const usuarioIds = data.map((x) => x.usuarioId);
    const usuarioIdsRemove: number[] = [];

    usuarioIds.forEach((x) => {
      if (body.vinculoUsuarioGrupo.find((i) => i.usuarioId != x)) {
        usuarioIdsRemove.push(x);
      }
      if (!body.vinculoUsuarioGrupo.length) {
        usuarioIdsRemove.push(x);
      }
    });

    usuarioIdsRemove.forEach(async (usuarioId) => {
      await this.vinculoUsuarioGrupoService.deletarPorUsuarioId(usuarioId);
    });
    return this.grupoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.grupoService.deletar(id);
  }
}
