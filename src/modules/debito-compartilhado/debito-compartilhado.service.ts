import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoCompartilhadoPost } from './request/debito-compartilhado.post';
import { DebitoCompartilhadoPut } from './request/debito-compartilhado.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';

@Injectable()
export class DebitoCompartilhadoService {
  constructor(
    @InjectRepository(DebitoCompartilhado)
    private repository: Repository<DebitoCompartilhado>,
  ) {}

  async criar(body: DebitoCompartilhadoPost) {
    body.nome = body.nome.toUpperCase();
    const debito = this.repository.create(body);
    return await this.repository.save(debito);
  }

  async listar(request: Request): Promise<DebitoCompartilhado[]> {
    return this.repository.find({
      relations: {
        categoria: true,
        responsavel: true,
        debitoCompartilhadoUsuario: {
          usuario: true,
          debitoCompartilhado: true,
        },
      },
      where: request.query,
      order: { pago: 'ASC', vencimento: 'ASC' },
    });
  }

  async obterPorId(id: number): Promise<DebitoCompartilhado> {
    return await this.repository.findOne({
      relations: {
        categoria: true,
        responsavel: true,
        debitoCompartilhadoUsuario: {
          usuario: true,
          debitoCompartilhado: true,
        },
      },
      where: { id },
    });
  }

  async editar(id: number, body: DebitoCompartilhadoPut) {
    const debito = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!debito) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.save(debito);
  }

  async deletar(id: number) {
    const debito = await this.obterPorId(id);
    if (!debito) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.remove(debito);
  }
}
