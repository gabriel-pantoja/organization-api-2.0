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

@Injectable()
export class MeuDebitoDomain {
  constructor(private readonly meuDebitoService: MeuDebitoService) {}

  async criar(body: MeuDebitoPost) {
    const data = await this.meuDebitoService.criar(body);
    return data;
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
    return this.meuDebitoService.editar(id, body);
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
