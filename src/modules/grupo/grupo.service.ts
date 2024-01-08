import { Injectable, NotFoundException } from '@nestjs/common';
import { GrupoPost } from './request/grupo.post';
import { GrupoPut } from './request/grupo.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Grupo } from 'src/database/entities/grupo.entity';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo)
    private repository: Repository<Grupo>,
  ) {}

  async criar(body: GrupoPost) {
    const grupo = this.repository.create(body);
    return await this.repository.save(grupo);
  }

  async listar(request: Request): Promise<Grupo[]> {
    return await this.repository.find({
      where: request.query,
      relations: { vinculoUsuarioGrupo: { usuario: true } },
    });
  }

  async obterPorId(id: number): Promise<Grupo> {
    return await this.repository.findOne({
      where: { id },
      relations: { vinculoUsuarioGrupo: { usuario: true, grupo: true } },
    });
  }

  async editar(id: number, body: GrupoPut) {
    // const group = this.repository.create(updateGroupDto);
    // group.linkedUserGroup = updateGroupDto.linkedUserGroup.map(
    //   (x) =>
    //     ({ id: x.id, groupId: x.groupId, userId: x.userId } as LinkedUserGroup),
    // );
    // group.id = id;
    const grupo = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!grupo) {
      throw new NotFoundException(`Group ${id} not found`);
    }
    return this.repository.save(grupo);
  }

  async deletar(id: number) {
    const grupo = await this.obterPorId(id);
    if (!grupo) {
      throw new NotFoundException(`Group ${id} not found`);
    }
    return this.repository.remove(grupo);
  }
}
