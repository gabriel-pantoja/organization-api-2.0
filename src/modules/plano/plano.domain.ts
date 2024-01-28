import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PessoaPost } from './request/pessoa.post';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/database/entities/usuario.entity';
import { PlanoService } from 'src/modules/plano/plano.service';
import { EPlano } from 'src/core/enums/plano.enum';
import { PessoaPut } from './request/pessoa.put';
import { PessoaDto } from './dto/pessoa.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class PlanoDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly planoService: PlanoService,
  ) {}

  async adicionarPessoa(body: PessoaPost): Promise<Usuario> {
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

    return await this.usuarioService.criar(body);
  }

  async listarPessoas(request: Request) {
    return (await this.usuarioService.listar(request)).map((x) => {
      return PessoaDto.listarDto(x);
    });
  }

  async obterPessoaPorId(id: number) {
    return PessoaDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async editarPessoa(id: number, body: PessoaPut) {
    return await this.usuarioService.editar(id, body);
  }

  async deletarPessoa(id: number) {
    return await this.usuarioService.deletar(id);
  }

  async resetSenhaPessoa(id: number) {
    const usuario = await this.usuarioService.obterPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }
    const hash = await bcrypt.hash(
      usuario.nome.toUpperCase(),
      await bcrypt.genSalt(),
    );
    await this.usuarioService.resetSenha(id, hash);
  }
}
