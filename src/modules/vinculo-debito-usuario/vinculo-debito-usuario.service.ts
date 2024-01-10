import { Injectable, NotFoundException } from '@nestjs/common';
import { VinculoDebitoUsuarioPost } from './request/vinculo-debito-usuario.post';
import { VinculoDebitoUsuarioPut } from './request/vinculo-debito-usuario.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';

@Injectable()
export class VinculoDebitoUsuarioService {
  constructor(
    @InjectRepository(VinculoDebitoUsuario)
    private repository: Repository<VinculoDebitoUsuario>,
  ) {}

  async criar(body: VinculoDebitoUsuarioPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<VinculoDebitoUsuario[]> {
    return await this.repository.find({
      select: {
        debito: {
          id: true,
          nome: true,
          responsavelId: true,
          responsavel: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
          },
          valor: true,
          vencimento: true,
          referenteMesAno: true,
          pago: true,
          vinculoDebitoUsuario: {
            id: true,
            usuarioId: true,
            debitoId: true,
            pago: true,
            usuario: { id: true, nome: true, sobrenome: true, email: true },
          },
        },
      },
      relations: {
        debito: { responsavel: true, vinculoDebitoUsuario: { usuario: true } },
      },
      where: request.query,
    });
  }

  async listarConta(request: Request): Promise<VinculoDebitoUsuario[]> {
    return await this.repository.find({
      select: {
        debito: {
          id: true,
          nome: true,
          responsavelId: true,
          responsavel: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
          },
          valor: true,
          vencimento: true,
          referenteMesAno: true,
          pago: true,
          vinculoDebitoUsuario: {
            id: true,
            usuarioId: true,
            debitoId: true,
            pago: true,
            usuario: { id: true, nome: true, sobrenome: true, email: true },
          },
        },
      },
      relations: {
        debito: { responsavel: true, vinculoDebitoUsuario: { usuario: true } },
      },
      where: {
        usuarioId: Number(request.query.usuarioId),
        debito: { referenteMesAno: request.query.referenteMesAno.toString() },
      },
    });
  }

  async listarPorDebitoId(debitoId: number): Promise<VinculoDebitoUsuario[]> {
    return await this.repository.find({
      select: {
        debito: {
          id: true,
          nome: true,
          responsavelId: true,
          responsavel: {
            id: true,
            nome: true,
            sobrenome: true,
            email: true,
          },
          valor: true,
          vencimento: true,
          referenteMesAno: true,
          pago: true,
          vinculoDebitoUsuario: {
            id: true,
            usuarioId: true,
            debitoId: true,
            pago: true,
            usuario: { id: true, nome: true, sobrenome: true, email: true },
          },
        },
      },
      relations: {
        debito: { responsavel: true, vinculoDebitoUsuario: { usuario: true } },
      },
      where: {
        debitoId,
      },
    });
  }

  async obterPorId(id: number): Promise<VinculoDebitoUsuario> {
    return await this.repository.findOne({
      relations: {
        usuario: true,
        debito: true,
      },
      where: { id },
    });
  }

  async obterPorUsuarioId(
    usuarioId: number,
  ): Promise<VinculoDebitoUsuario | null> {
    return await this.repository.findOne({
      where: { usuarioId },
    });
  }

  async editar(id: number, body: VinculoDebitoUsuarioPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`LinkedDebtUser ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`LinkedDebtUser ${id} not found`);
    }
    return await this.repository.remove(data);
  }

  async deletarPorUsuarioId(usuarioId: number) {
    const data = await this.repository.findOneBy({ usuarioId: usuarioId });
    if (!data) {
      throw new NotFoundException(`User Group By User ${usuarioId} not found`);
    }
    return await this.repository.remove(data);
  }
}
