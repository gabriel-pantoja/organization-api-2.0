import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { DebitoCompartilhadoUsuarioPost } from './request/debito-compartilhado-usuario.post';
import { DebitoCompartilhadoUsuarioPut } from './request/debito-compartilhado-usuario.put';

@Injectable()
export class DebitoCompartilhadoUsuarioService {
  constructor(
    @InjectRepository(DebitoCompartilhadoUsuario)
    private repository: Repository<DebitoCompartilhadoUsuario>,
  ) {}

  async criar(body: DebitoCompartilhadoUsuarioPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<DebitoCompartilhadoUsuario[]> {
    return await this.repository.find({
      select: {
        debitoCompartilhado: {
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
          debitoCompartilhadoUsuario: {
            id: true,
            usuarioId: true,
            debitoCompartilhadoId: true,
            pago: true,
            usuario: {
              id: true,
              nome: true,
              sobrenome: true,
              email: true,
            },
          },
        },
      },
      relations: {
        debitoCompartilhado: {
          responsavel: true,
          debitoCompartilhadoUsuario: { usuario: true },
        },
      },
      where: request.query,
    });
  }

  async listarPorDebitoId(
    debitoCompartilhadoId: number,
  ): Promise<DebitoCompartilhadoUsuario[]> {
    return await this.repository.find({
      select: {
        debitoCompartilhado: {
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
          debitoCompartilhadoUsuario: {
            id: true,
            usuarioId: true,
            debitoCompartilhadoId: true,
            pago: true,
            usuario: {
              id: true,
              nome: true,
              sobrenome: true,
              email: true,
            },
          },
        },
      },
      relations: {
        debitoCompartilhado: {
          responsavel: true,
          debitoCompartilhadoUsuario: { usuario: true },
        },
      },
      where: {
        debitoCompartilhadoId,
      },
    });
  }

  async obterPorId(id: number): Promise<DebitoCompartilhadoUsuario> {
    return await this.repository.findOne({
      relations: {
        usuario: true,
        debitoCompartilhado: true,
      },
      where: { id },
    });
  }

  async obterPorUsuarioId(
    usuarioId: number,
  ): Promise<DebitoCompartilhadoUsuario | null> {
    return await this.repository.findOne({
      where: { usuarioId },
    });
  }

  async editar(id: number, body: DebitoCompartilhadoUsuarioPut) {
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
    const data = await this.repository.findOneBy({
      usuarioId: usuarioId,
    });
    if (!data) {
      throw new NotFoundException(`User Group By User ${usuarioId} not found`);
    }
    return await this.repository.remove(data);
  }
}
