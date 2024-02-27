import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoPost } from './request/debito.post';
import { DebitoService } from './debito.service';
import { DebitoDto } from './dto/debito.dto';
import { Request } from 'express';
import { DebitoPut } from './request/debito.put';
import { VinculoDebitoUsuarioService } from '../vinculo-debito-usuario/vinculo-debito-usuario.service';
import { EmailService } from 'src/core/services/email.service';

@Injectable()
export class DebitoDomain {
  constructor(
    private readonly debitoService: DebitoService,
    private readonly vinculoDebitoUsuarioService: VinculoDebitoUsuarioService,
    private readonly emailService: EmailService,
  ) {}

  async criar(body: DebitoPost) {
    const debito = await this.debitoService.criar(body);

    // body.vinculoDebitoUsuario.forEach(async (x) => {
    //   await this.emailService.sendVinculadoNovoDebito(x.email, body);
    // });

    return debito;
  }

  async listar(request: Request) {
    return (await this.debitoService.listar(request)).map((x) => {
      return DebitoDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return DebitoDto.listar(await this.debitoService.obterPorId(+id));
  }

  async editar(id: number, body: DebitoPut) {
    const data = await this.vinculoDebitoUsuarioService.listarPorDebitoId(+id);

    const usuarioIds = data.map((x) => x.usuarioId);
    const usuarioIdsremove: number[] = [];

    usuarioIds.forEach((x) => {
      if (!body.vinculoDebitoUsuario.find((i) => i.usuarioId == x)) {
        usuarioIdsremove.push(x);
      }
      if (!body.vinculoDebitoUsuario.length) {
        usuarioIdsremove.push(x);
      }
    });

    usuarioIdsremove.forEach(async (usuarioId) => {
      await this.vinculoDebitoUsuarioService.deletarPorUsuarioId(usuarioId);
    });

    return this.debitoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.debitoService.deletar(id);
  }
}
