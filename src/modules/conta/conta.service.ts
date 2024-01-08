import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { VinculoDebitoUsuario } from 'src/database/entities/vinculo-debito-usuario.entity';

@Injectable()
export class ContaService {
  constructor(
    @InjectRepository(VinculoDebitoUsuario)
    private repository: Repository<VinculoDebitoUsuario>,
  ) {}

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
      where: {
        usuarioId: Number(request.query.usuarioId),
        debito: { referenteMesAno: request.query.referenteMesAno.toString() },
      },
    });
  }
}
