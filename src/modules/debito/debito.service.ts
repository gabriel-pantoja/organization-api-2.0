import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoPost } from './request/debito.post';
import { DebitoPut } from './request/debito.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debito } from 'src/database/entities/debito.entity';
import { Request } from 'express';

@Injectable()
export class DebitoService {
  constructor(
    @InjectRepository(Debito)
    private repository: Repository<Debito>,
  ) {}

  async criar(body: DebitoPost) {
    body.nome = body.nome.toUpperCase();
    const debito = this.repository.create(body);
    debito.pago = false;
    return await this.repository.save(debito);
  }

  async listar(request: Request): Promise<Debito[]> {
    return this.repository.find({
      relations: {
        tipoDebito: true,
        responsavel: true,
        vinculoDebitoUsuario: { usuario: true, debito: true },
      },
      where: request.query,
    });
  }

  async obterPorId(id: number): Promise<Debito> {
    return await this.repository.findOne({
      relations: {
        tipoDebito: true,
        responsavel: true,
        vinculoDebitoUsuario: { usuario: true, debito: true },
      },
      where: { id },
    });
  }

  async editar(id: number, body: DebitoPut) {
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
