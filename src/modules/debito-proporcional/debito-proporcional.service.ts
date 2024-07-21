import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoProporcionalPost } from './request/debito-proporcional.post';
import { PagarPut } from './request/pagar.put';
import { DebitoProporcionalPut } from './request/debito-proporcional.put';
import { DebitoProporcional } from 'src/database/entities/debito-proporcional';
import { UsuarioVinculadoDebitoProporcional } from 'src/database/entities/usuario-vinculado-debito-proporcional.entity';
import { UsuarioVinculadoDebitoProporcionalPost } from './request/usuario-vinculado-debito-proporcional.post';

@Injectable()
export class DebitoProporcionalService {
  constructor(
    @InjectRepository(DebitoProporcional)
    private repository: Repository<DebitoProporcional>,
    @InjectRepository(UsuarioVinculadoDebitoProporcional)
    private usuarioVinculadoDebitoProporcionalRepository: Repository<UsuarioVinculadoDebitoProporcional>,
  ) {}

  async criar(body: DebitoProporcionalPost) {
    body.descricao = body.descricao?.trim();
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async criarUsuarioVinculado(body: UsuarioVinculadoDebitoProporcionalPost) {
    const data = this.usuarioVinculadoDebitoProporcionalRepository.create(body);
    return await this.usuarioVinculadoDebitoProporcionalRepository.save(data);
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

  async listarUsuarioVinculado(
    request: Request,
  ): Promise<UsuarioVinculadoDebitoProporcional[]> {
    return this.usuarioVinculadoDebitoProporcionalRepository.find({
      relations: {
        usuario: true,
        usuarioVinculado: true,
      },
      where: request.query,
    });
  }

  async listarPorUsuarioId(usuarioId: number): Promise<DebitoProporcional[]> {
    return await this.repository.find({
      where: { usuarioId: usuarioId },
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

  async obterUsuarioVinculadoPorId(
    id: number,
  ): Promise<UsuarioVinculadoDebitoProporcional> {
    return await this.usuarioVinculadoDebitoProporcionalRepository.findOne({
      where: { id },
    });
  }

  async obterPorUsuarioVinculadoId(
    usuarioId: number,
  ): Promise<UsuarioVinculadoDebitoProporcional> {
    return await this.usuarioVinculadoDebitoProporcionalRepository.findOne({
      relations: {
        usuario: true,
        usuarioVinculado: true,
      },
      where: { usuarioId },
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

  async deletarUsuarioVinculado(id: number) {
    const data = await this.obterUsuarioVinculadoPorId(id);
    if (!data) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return this.usuarioVinculadoDebitoProporcionalRepository.remove(data);
  }
}
