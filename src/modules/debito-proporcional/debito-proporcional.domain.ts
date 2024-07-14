import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DebitoProporcionalDto } from './dto/debito-proporcional.dto';
import { Request } from 'express';
import { DebitoProporcionalService } from './debito-proporcional.service';
import { DebitoProporcionalPut } from './request/debito-proporcional.put';
import { DebitoProporcionalPost } from './request/debito-proporcional.post';
import { PagarPut } from './request/pagar.put';
import * as moment from 'moment';
import { UsuarioVinculadoDebitoProporcionalPost } from './request/usuario-vinculado-debito-proporcional.post';

@Injectable()
export class DebitoProporcionalDomain {
  constructor(
    private readonly debitoProporcionalService: DebitoProporcionalService,
  ) {}

  async criar(body: DebitoProporcionalPost) {
    if (body.debitoRecorrente) {
      const meuDebito = await this.debitoProporcionalService.criar(body);
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
        await this.debitoProporcionalService.criar(body);

        return null;
      }
    } else {
      return await this.debitoProporcionalService.criar(body);
    }
  }

  async criarUsuarioVinculado(body: UsuarioVinculadoDebitoProporcionalPost) {
    return await this.debitoProporcionalService.criarUsuarioVinculado(body);
  }

  async listar(request: Request) {
    return (await this.debitoProporcionalService.listar(request)).map((x) => {
      return DebitoProporcionalDto.listar(x);
    });
  }

  async listarUsuarioVinculado(request: Request) {
    return await this.debitoProporcionalService.listarUsuarioVinculado(request);
  }

  async selectNome() {
    return (await this.debitoProporcionalService.selectNome()).map((x) => {
      return DebitoProporcionalDto.selectNome(x);
    });
  }

  async obterPorId(id: number) {
    return DebitoProporcionalDto.listar(
      await this.debitoProporcionalService.obterPorId(+id),
    );
  }

  async obterPorUsuarioVincladoId(id: number) {
    return await this.debitoProporcionalService.obterPorUsuarioVinculadoId(+id);
  }

  async editar(id: number, body: DebitoProporcionalPut) {
    if (body.debitoRecorrente) {
      return await this.debitoProporcionalService.editar(id, body);
    } else {
      return await this.debitoProporcionalService.editar(id, body);
    }
  }

  async pagar(id: number, body: PagarPut) {
    if (body.juros && body.valorJuros == null) {
      throw new BadRequestException(`Valor do Juros precisa esta preenchido`);
    }
    if (body.juros == false) {
      body.valorJuros = 0;
    }
    return this.debitoProporcionalService.pagar(id, body);
  }

  async deletar(id: number) {
    return await this.debitoProporcionalService.deletar(id);
  }

  async deletarUsuarioVinculado(id: number) {
    return await this.debitoProporcionalService.deletarUsuarioVinculado(id);
  }
}
