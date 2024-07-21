import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DebitoCompartilhadoPost } from './request/debito-compartilhado.post';
import { DebitoCompartilhadoService } from './debito-compartilhado.service';
import { DebitoCompartilhadoDto } from './dto/debito-compartilhado.dto';
import { Request } from 'express';
import { DebitoCompartilhadoPut } from './request/debito-compartilhado.put';
import { EmailService } from 'src/core/services/email.service';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Injectable()
export class DebitoCompartilhadoDomain {
  constructor(
    private readonly debitoCompartilhadoService: DebitoCompartilhadoService,
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
    private readonly emailService: EmailService,
  ) {}

  async criar(body: DebitoCompartilhadoPost) {
    const debitos = await this.debitoCompartilhadoService.listarPorUsuarioId(body.criadoPorUsuarioId);
    if(debitos.length >= 20) {
      throw new BadRequestException('Execedeu limite de registro para o Débito Compartilhado no plano Free.');
    }
    const debito = await this.debitoCompartilhadoService.criar(body);

    // body.debitoCompartilhadoUsuario.forEach(async (x) => {
    //   const usuario =
    //     await this.debitoCompartilhadoUsuarioService.obterPorUsuarioId(
    //       x.usuarioId,
    //     );
    //   await this.emailService.sendVinculadoNovoDebito(
    //     usuario.usuario.email,
    //     body,
    //   );
    // });

    return debito;
  }

  async listar(request: Request) {
    return (await this.debitoCompartilhadoService.listar(request)).map((x) => {
      return DebitoCompartilhadoDto.listar(x);
    });
  }

  async listarPaginacao(request: Request) {
    return (await this.debitoCompartilhadoService.listarPaginacao(request)).map(
      (x) => {
        return DebitoCompartilhadoDto.listar(x);
      },
    );
  }

  async obterPorId(id: number) {
    return DebitoCompartilhadoDto.listar(
      await this.debitoCompartilhadoService.obterPorId(+id),
    );
  }

  async editar(id: number, body: DebitoCompartilhadoPut) {
    const data = await this.debitoCompartilhadoUsuarioService.listarPorDebitoId(
      +id,
    );

    const usuarioIds = data.map((x) => x.usuarioId);
    const usuarioIdsremove: number[] = [];

    usuarioIds.forEach((x) => {
      if (!body.debitoCompartilhadoUsuario.find((i) => i.usuarioId == x)) {
        usuarioIdsremove.push(x);
      }
      if (!body.debitoCompartilhadoUsuario.length) {
        usuarioIdsremove.push(x);
      }
    });

    usuarioIdsremove.forEach(async (usuarioId) => {
      await this.debitoCompartilhadoUsuarioService.deletarPorUsuarioId(
        usuarioId,
      );
    });

    return this.debitoCompartilhadoService.editar(id, body);
  }

  async deletar(id: number) {
    return await this.debitoCompartilhadoService.deletar(id);
  }
}
