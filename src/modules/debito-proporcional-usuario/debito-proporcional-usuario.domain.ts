import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DebitoProporcionalUsuarioService } from './debito-proporcional-usuario.service';
import { DebitoProporcionalUsuarioPost } from './request/debito-proporcional-usuario.post';
import { DebitoProporcionalUsuarioDto } from './dto/debito-proporcional-usuario.dto';
import { DebitoProporcionalUsuarioPut } from './request/debito-proporcional-usuario.put';

@Injectable()
export class DebitoProporcionalUsuarioDomain {
  constructor(
    private readonly debitoProporcionalUsuarioService: DebitoProporcionalUsuarioService,
  ) {}

  async add(body: DebitoProporcionalUsuarioPost) {
    return await this.debitoProporcionalUsuarioService.add(body);
  }

  async get(request: Request) {
    return (await this.debitoProporcionalUsuarioService.get(request)).map(
      (x) => {
        return DebitoProporcionalUsuarioDto.get(x);
      },
    );
  }

  async getById(id: number) {
    return DebitoProporcionalUsuarioDto.get(
      await this.debitoProporcionalUsuarioService.getById(+id),
    );
  }

  async getByUsuarioId(usuarioId: number) {
    return (
      await this.debitoProporcionalUsuarioService.getByUsuarioId(+usuarioId)
    ).map((x) => {
      return DebitoProporcionalUsuarioDto.get(x);
    });
  }

  async put(id: number, body: DebitoProporcionalUsuarioPut) {
    return this.debitoProporcionalUsuarioService.put(id, body);
  }

  async delete(id: number) {
    return await this.debitoProporcionalUsuarioService.delete(id);
  }
}
