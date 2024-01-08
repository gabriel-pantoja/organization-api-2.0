import { Injectable, NotFoundException } from '@nestjs/common';
import { VinculoUsuarioGrupoPost } from './request/vinculo-usuario-grupo.post';
import { VinculoUsuarioGrupoPut } from './request/vinculo-usuario-grupo.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinculoUsuarioGrupo } from 'src/database/entities/vinculo-usuario-grupo.entity';

@Injectable()
export class VinculoUsuarioGrupoService {
  constructor(
    @InjectRepository(VinculoUsuarioGrupo)
    private repository: Repository<VinculoUsuarioGrupo>,
  ) {}

  async criar(body: VinculoUsuarioGrupoPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(): Promise<VinculoUsuarioGrupo[]> {
    return await this.repository.find({
      select: {
        usuario: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
        },
      },
      relations: { usuario: true, grupo: true },
    });
  }

  async listarPorGrupoId(grupoId: number): Promise<VinculoUsuarioGrupo[]> {
    return await this.repository.find({
      select: {
        usuario: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
        },
      },
      relations: { usuario: true, grupo: true },
      where: { grupoId },
    });
  }

  async obterPorId(id: number): Promise<VinculoUsuarioGrupo> {
    return await this.repository.findOne({
      select: {
        usuario: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
        },
      },
      relations: { usuario: true, grupo: true },
      where: { id },
    });
  }

  async editar(id: number, body: VinculoUsuarioGrupoPut) {
    const vinculoUsuarioGrupo = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!vinculoUsuarioGrupo) {
      throw new NotFoundException(`User Group ${id} not found`);
    }
    return await this.repository.save(vinculoUsuarioGrupo);
  }

  async deletar(id: number) {
    const vinculoUsuarioGrupo = await this.obterPorId(id);
    if (!vinculoUsuarioGrupo) {
      throw new NotFoundException(`User Group ${id} not found`);
    }
    return await this.repository.remove(vinculoUsuarioGrupo);
  }

  async deletarPorUsuarioId(usuarioId: number) {
    const vinculoUsuarioGrupo = await this.repository.findOneBy({
      usuarioId: usuarioId,
    });
    if (!vinculoUsuarioGrupo) {
      throw new NotFoundException(`User Group By User ${usuarioId} not found`);
    }
    return await this.repository.remove(vinculoUsuarioGrupo);
  }
}
