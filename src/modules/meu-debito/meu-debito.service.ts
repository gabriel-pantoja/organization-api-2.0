import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { MeuDebitoPost } from './request/meu-debito.post';
import { MeuDebitoPut } from './request/meu-debito.put';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';
import { PagarPut } from './request/pagar.put';

@Injectable()
export class MeuDebitoService {
  constructor(
    @InjectRepository(MeuDebito)
    private repository: Repository<MeuDebito>,
  ) {}

  async criar(body: MeuDebitoPost) {
    body.descricao = body.descricao?.trim();
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async listar(request: Request): Promise<MeuDebito[]> {
    // const quantidade =
    //   request.query.quantidade == null ? 10 : Number(request.query.quantidade);
    // const pagina =
    //   request.query.pagina == null ? 1 : Number(request.query.pagina);
    return this.repository.find({
      relations: {
        categoria: true,
        tipoDebito: true,
        formaPagamento: true,
        banco: true,
        localPagamento: true,
      },
      where: request.query,
      // take: quantidade,
      // skip: pagina - 1,
      order: { pago: 'ASC', vencimento: 'ASC' },
    });
  }

  async listarPorReferenteMes(
    referenteMesAno: string,
    usuarioId: number,
  ): Promise<MeuDebito[]> {
    return await this.repository.find({
      where: { referenteMesAno: referenteMesAno, usuarioId: usuarioId },
    });
  }

  async selectNome(): Promise<MeuDebito[]> {
    return this.repository
      .createQueryBuilder('meuDebito')
      .select('DISTINCT meuDebito.nome')
      .where("meuDebito.nome IS NOT NULL AND meuDebito.nome <> ''")
      .orderBy('meuDebito.nome', 'ASC')
      .getRawMany();
  }

  async obterPorId(id: number): Promise<MeuDebito> {
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

  async editar(id: number, body: MeuDebitoPut) {
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
