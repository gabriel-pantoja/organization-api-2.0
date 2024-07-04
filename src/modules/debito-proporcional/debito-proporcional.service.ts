import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoProporcionalPost } from './request/debito-proporcional.post';
import { PagarPut } from './request/pagar.put';
import { DebitoProporcional } from 'src/database/entities/debito-proporcioal';
import { DebitoProporcionalPut } from './request/debito-proporcional.put';

@Injectable()
export class DebitoProporcionalService {
  constructor(
    @InjectRepository(DebitoProporcional)
    private repository: Repository<DebitoProporcional>,
  ) {}

  async criar(body: DebitoProporcionalPost) {
    body.descricao = body.descricao?.trim();
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<DebitoProporcional[]> {
    return this.repository.find({
      relations: {
        categoria: true,
        tipoDebito: true,
        formaPagamento: true,
        banco: true,
        localPagamento: true,
      },
      where: request.query,
      order: { pago: 'ASC', vencimento: 'ASC' },
    });
  }

  async selectNome(): Promise<DebitoProporcional[]> {
    return this.repository
      .createQueryBuilder('debitoProporcional')
      .select(
        'DISTINCT debitoProporcional.nome, debitoProporcional.categoriaId, debitoProporcional.tipoDebitoId',
      )
      .where(
        "debitoProporcional.nome IS NOT NULL AND debitoProporcional.nome <> ''",
      )
      .orderBy('debitoProporcional.nome', 'ASC')
      .getRawMany();
  }

  async obterPorId(id: number): Promise<DebitoProporcional> {
    return await this.repository.findOne({
      relations: {
        categoria: true,
        tipoDebito: true,
        formaPagamento: true,
        banco: true,
        localPagamento: true,
      },
      where: { id },
    });
  }

  async editar(id: number, body: DebitoProporcionalPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.save(data);
  }

  async pagar(id: number, body: PagarPut) {
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    data.dataPagamento = new Date();
    data.pago = true;
    return this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.repository.remove(data);
  }
}
