import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { PlanoService } from 'src/core/services/plano.service';
import { EPlano } from 'src/core/enums/plano.enum';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { VinculadoPost } from './request/vinculado.post';
import { VinculadoDto } from './dto/vinculado.dto';
import { VinculadoPut } from './request/vinculado.put';

@Injectable()
export class VinculadoDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly planoService: PlanoService,
  ) {}

  async add(body: VinculadoPost): Promise<Usuario> {
    const usuario = await this.usuarioService.obterPorId(body.usuarioId);
    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    const totalUsuario = (
      await this.usuarioService.listarPorUsuarioId(usuario.id)
    ).length;
    const plano = await this.planoService.obterPorId(usuario.planoId);

    if (plano.id == EPlano.Basic) {
      if (5 == totalUsuario) {
        throw new BadRequestException(
          `Plano: Basic - Excedeu quantitade de usuários`,
        );
      }
    } else if (plano.id === EPlano.Plus) {
      if (10 == totalUsuario) {
        throw new BadRequestException(
          `Plano: Plus - Excedeu quantitade de usuários`,
        );
      }
    }

    return await this.usuarioService.addVinculado(body);
  }

  async listar(request: Request) {
    return (await this.usuarioService.listar(request)).map((x) => {
      return VinculadoDto.listarDto(x);
    });
  }

  async obterPessoaPorId(id: number) {
    return VinculadoDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async editarVinculado(id: number, body: VinculadoPut) {
    return await this.usuarioService.editarVinculado(id, body);
  }

  async deletarVinculado(id: number) {
    return await this.usuarioService.deletarVinculado(id);
  }

  async resetSenhaVinculado(id: number) {
    const usuario = await this.usuarioService.obterPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }
    const hash = await bcrypt.hash(
      usuario.nome.toUpperCase(),
      await bcrypt.genSalt(),
    );
    await this.usuarioService.resetSenhaVinculado(id, hash);
  }
}
