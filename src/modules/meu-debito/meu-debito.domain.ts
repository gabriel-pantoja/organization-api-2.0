import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MeuDebitoDto } from './dto/meu-debito.dto';
import { Request } from 'express';
import { MeuDebitoService } from './meu-debito.service';
import { MeuDebitoPut } from './request/meu-debito.put';
import { MeuDebitoPost } from './request/meu-debito.post';
import { PagarPut } from './request/pagar.put';
import * as moment from 'moment';

@Injectable()
export class MeuDebitoDomain {
  constructor(private readonly meuDebitoService: MeuDebitoService) {}

  async criar(body: MeuDebitoPost) {
    const debitos = await this.meuDebitoService.listarPorUsuarioId(body.usuarioId);
    if(debitos.length >= 20) {
      throw new BadRequestException('Execedeu limite de registro para o Meu Débito no plano Free.');
    }
    if (body.debitoRecorrente) {
      const meuDebito = await this.meuDebitoService.criar(body);
      for (let index = 1; index < body.parcelas; index++) {
        let referenteMesAno = moment(body.referenteMesAno, 'MM/YYYY');
        referenteMesAno.add(1, 'month');
        let vencimento = moment(body.vencimento);
        vencimento.add(1, 'month');

        body.vencimento = moment(vencimento).toDate();
        body.referenteMesAno = moment(referenteMesAno).format('MM/YYYY');

        body.debitoRecorrente = null;
        body.parcelas = null;
        body.debitoParceladoId = meuDebito.id;
        await this.meuDebitoService.criar(body);

        return null;
      }
    } else {
      return await this.meuDebitoService.criar(body);
    }
  }

  async listar(request: Request) {
    return (await this.meuDebitoService.listar(request)).map((x) => {
      return MeuDebitoDto.listar(x);
    });
  }

  async selectNome() {
    return (await this.meuDebitoService.selectNome()).map((x) => {
      return MeuDebitoDto.selectNome(x);
    });
  }

  async obterPorId(id: number) {
    return MeuDebitoDto.listar(await this.meuDebitoService.obterPorId(+id));
  }

  async editar(id: number, body: MeuDebitoPut) {
    if (body.debitoRecorrente) {
      return await this.meuDebitoService.editar(id, body);
    } else {
      return await this.meuDebitoService.editar(id, body);
    }
  }

  async pagar(id: number, body: PagarPut) {
    if (body.juros && body.valorJuros == null) {
      throw new BadRequestException(`Valor do Juros precisa esta preenchido`);
    }
    if (body.juros == false) {
      body.valorJuros = 0;
    }
    return this.meuDebitoService.pagar(id, body);
  }

  async deletar(id: number) {
    return await this.meuDebitoService.deletar(id);
  }
}
