import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioPost } from './request/usuario.post';
import * as bcrypt from 'bcrypt';
import { EditarSenhaPut } from './request/editar-senha.put';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EPlano } from '../../core/enums/plano.enum';
import { NovoUsuarioPost } from './request/novo-usuario.post';
import { CriarSenhaPost } from './request/criar-senha.post';
import { RedefinirSenhaPost } from './request/redefinir-senha.post';
import { PlanoService } from '../../core/services/plano.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { EntrarPlanoPut } from './request/entrar-plano.put';
import { Usuario } from 'src/database/entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioPut } from './request/usuario.put';

@Injectable()
export class UsuarioDomain {
  constructor(
    private usuarioService: UsuarioService,
    private planoService: PlanoService,
    private mensalidadeService: MensalidadeService,
    private jwtService: JwtService,
  ) {}

  async criar(body: UsuarioPost): Promise<Usuario> {
    const usuario = await this.usuarioService.obterPorId(body.usuarioId);
    if (!usuario) {
      throw new NotFoundException(`User ${body.usuarioId} not found`);
    }

    const quantiyUsers = (
      await this.usuarioService.listarPorUsuarioId(usuario.id)
    ).length;
    const plano = await this.planoService.obterPorId(usuario.planoId);

    if (plano.id == EPlano.Basic) {
      if (5 == quantiyUsers) {
        throw new BadRequestException(
          `Plano: Basic - Excedeu quantitade de usuários`,
        );
      }
    } else if (plano.id === EPlano.Plus) {
      if (10 == quantiyUsers) {
        throw new BadRequestException(
          `Plano: Plus - Excedeu quantitade de usuários`,
        );
      }
    }

    return await this.usuarioService.criar(body);
  }

  async listar(request: Request) {
    return (await this.usuarioService.listar(request)).map((x) => {
      return UsuarioDto.listarDto(x);
    });
  }

  async obterPorId(id: number) {
    return UsuarioDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async novoUsuario(body: NovoUsuarioPost) {
    const data = await this.usuarioService.novoUsuario(body);

    this.mensalidadeService.criar({
      usuarioId: data.id,
      formaPagamento: body.formaPagamento,
      pago: true,
      vencimento: new Date(),
    });

    const payload = { id: data.id, email: data.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      url: process.env.URL + '/#/senha/criar/' + token,
    };
  }

  async esqueceuSenha(email: string) {
    const user = await this.usuarioService.obterPorEmail(email);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      url: process.env.URL + '/#/senha/redefinir/' + token,
    };
  }

  async editar(id: number, body: UsuarioPut) {
    return await this.usuarioService.editar(id, body);
  }

  async entrarPlano(id: number, body: EntrarPlanoPut) {
    const usuario = await this.usuarioService.entrarPlano(id, body);

    this.mensalidadeService.criar({
      usuarioId: id,
      formaPagamento: body.formaPagamento,
      pago: true,
      vencimento: new Date(),
    });

    return usuario;
  }

  async deletar(id: number) {
    return await this.usuarioService.deletar(id);
  }

  async criarSenha(body: CriarSenhaPost) {
    const id = this.jwtService.decode(body.token)['id'];
    const hash = await bcrypt.hash(body.senha, await bcrypt.genSalt());
    await this.usuarioService.criarSenha(id, hash);
  }

  async redefinirSenha(body: RedefinirSenhaPost) {
    const id = this.jwtService.decode(body.token)['id'];
    const hash = await bcrypt.hash(body.senha, await bcrypt.genSalt());
    await this.usuarioService.redefinirSenha(id, hash);
  }

  async editarSenha(id: number, body: EditarSenhaPut) {
    const hash = await bcrypt.hash(body.senha, await bcrypt.genSalt());
    await this.usuarioService.editarSenha(id, hash);
  }

  async atualizarUltimoAcesso(id: number) {
    await this.usuarioService.atualizarUltimoAcesso(id);
  }
}
