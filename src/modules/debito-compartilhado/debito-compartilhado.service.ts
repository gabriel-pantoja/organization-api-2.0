import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoCompartilhadoPost } from './request/debito-compartilhado.post';
import { DebitoCompartilhadoPut } from './request/debito-compartilhado.put';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, In, Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';
import { DebitoCompartilhadoUsuario } from 'src/database/entities/debito-compartilhado-usuario.entity';
import { Categoria } from 'src/database/entities/categoria.entity';

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
      // take: 2,
      // skip: 0,
      order: { pago: 'ASC', vencimento: 'ASC' },
    });
  }

  async listarPaginacao(request: Request): Promise<DebitoCompartilhado[]> {
    const quantidade =
      request.query.quantidade == null ? 10 : Number(request.query.quantidade);
    const pagina =
      request.query.pagina == null ? 1 : Number(request.query.pagina);
    return this.repository
      .createQueryBuilder('debito_compartilhado')
      .leftJoinAndSelect('debito_compartilhado.categoria', 'categoria')
      .leftJoinAndSelect('debito_compartilhado.responsavel', 'responsavel')
      .leftJoinAndSelect(
        'debito_compartilhado.debitoCompartilhadoUsuario',
        'debito_compartilhado_usuario',
      )
      .leftJoinAndSelect(
        'debito_compartilhado_usuario.usuario',
        'usuario',
      )
      .where(
        new Brackets((qb) => {
          if (request.query.criadoPorUsuarioId) {
            qb.where(
              'debito_compartilhado.criadoPorUsuarioId = :criadoPorUsuarioId',
              {
                criadoPorUsuarioId: Number(request.query.criadoPorUsuarioId),
              },
            );
          }
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('debito_compartilhado.referenteMesAno = :referenteMesAno', {
            referenteMesAno: request.query.referenteMesAno
              ? request.query.referenteMesAno.toString()
              : null,
          }).orWhere('debito_compartilhado.referenteMesAno IS NULL');
        }),
      )
      .orderBy('debito_compartilhado.pago', 'ASC')
      .addOrderBy('debito_compartilhado.vencimento', 'ASC')
      .take(quantidade)
      .skip(pagina - 1)
      .getMany();
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
