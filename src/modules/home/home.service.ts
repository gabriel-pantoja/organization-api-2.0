import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Request } from 'express';
import { MeuDebito } from 'src/database/entities/meu-debito.entity';
import { DebitoCompartilhado } from 'src/database/entities/debito-compartilhado.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(DebitoCompartilhado)
    private debitoCompartilhadoRepository: Repository<DebitoCompartilhado>,
    @InjectRepository(MeuDebito)
    private meuDebitoRepository: Repository<MeuDebito>,
  ) {}

  async getDebitoCompartilhado(
    request: Request,
  ): Promise<DebitoCompartilhado[]> {
    return this.debitoCompartilhadoRepository
      .createQueryBuilder('debito_compartilhado')
      .leftJoinAndSelect('debito_compartilhado.categoria', 'categoria')
      .leftJoinAndSelect('debito_compartilhado.responsavel', 'responsavel')
      .leftJoinAndSelect(
        'debito_compartilhado.debitoCompartilhadoUsuario',
        'debito_compartilhado_usuario',
      )
      .leftJoinAndSelect('debito_compartilhado_usuario.usuario', 'usuario')
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
      .getMany();
  }

  async getMeuDebito(request: Request): Promise<MeuDebito[]> {
    return this.meuDebitoRepository.find({
      relations: {
        categoria: true,
        tipoDebito: true,
        formaPagamento: true,
        banco: true,
        localPagamento: true,
      },
      where: {
        usuarioId: Number(request.query.usuarioId),
        referenteMesAno: request.query.referenteMesAno.toString(),
      },
      order: { nome: 'ASC' },
    });
  }
}
