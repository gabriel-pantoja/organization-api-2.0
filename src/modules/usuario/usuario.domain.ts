import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AlterarSenhaPut } from './request/alterar-senha.put';
import { JwtService } from '@nestjs/jwt';
import { NovoUsuarioPost } from './request/novo-usuario.post';
import { CriarSenhaPost } from './request/criar-senha.post';
import { RedefinirSenhaPost } from './request/redefinir-senha.post';
import { MensalidadeService } from '../mensalidade/mensalidade.service';
import { EntrarPlanoPut } from './request/entrar-plano.put';
import { UsuarioService } from './usuario.service';
import { EmailService } from 'src/core/services/email.service';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioPut } from './request/usuario.put';
import { EPlano } from 'src/core/enums/plano.enum';
import { RendaMensalPut } from './request/renda-mensal.put';
import { Request } from 'express';
import { VincularUsuarioPost } from './request/vincular-usuario.post';
import { Usuario } from 'src/database/entities/usuario.entity';
import { PlanoService } from 'src/core/services/plano.service';

@Injectable()
export class UsuarioDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly mensalidadeService: MensalidadeService,
    private readonly planoService: PlanoService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async add(body: NovoUsuarioPost) {
    const usuario = await this.usuarioService.obterPorEmail(body.email);
    if (usuario) 
      throw new BadRequestException(`E-mail ja cadastrado.`);
    
    const data = await this.usuarioService.addNovoUsuaio(body);

    if (body.planoId != EPlano.Free) {
      this.mensalidadeService.criar({
        usuarioId: data.id,
        formaPagamento: body.formaPagamento,
        pago: true,
        vencimento: new Date(),
      });
    }

    const payload = { id: data.id, email: data.email };
    const token = await this.jwtService.signAsync(payload);

    await this.emailService.sendNovaSenha({
      nome: data.nome,
      email: data.email,
      url: `${process.env.URL}/#/senha/criar/${token}`,
    });
  }

  async vincularUsuario(body: VincularUsuarioPost): Promise<Usuario> {
    const usuario = await this.usuarioService.obterPorId(body.usuarioId);
    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    const totalUsuario = (
      await this.usuarioService.listarPorUsuarioId(usuario.id)
    ).length;
    const plano = await this.planoService.obterPorId(usuario.planoId);

    if (plano.id == EPlano.Free) {
      if (5 == totalUsuario) {
        throw new BadRequestException(
          `Plano: Free - Excedeu quantitade de usuários.`,
        );
      }
    } else if (plano.id == EPlano.Basic) {
      if (5 == totalUsuario) {
        throw new BadRequestException(
          `Plano: Basic - Excedeu quantitade de usuários.`,
        );
      }
    } else if (plano.id === EPlano.Plus) {
      if (10 == totalUsuario) {
        throw new BadRequestException(
          `Plano: Plus - Excedeu quantitade de usuários.`,
        );
      }
    }

    return await this.usuarioService.addVincular(body);
  }

  async get(request: Request) {
    return (await this.usuarioService.get(request)).map((x) => {
      return UsuarioDto.map(x);
    });
  }

  async obterPorId(id: number) {
    return UsuarioDto.map(await this.usuarioService.obterPorId(+id));
  }

  async editar(id: number, body: UsuarioPut) {
    return await this.usuarioService.editar(id, body);
  }

  async esqueceuSenha(email: string) {
    const usuario = await this.usuarioService.obterPorEmail(email);
    if (!usuario) {
      throw new NotFoundException(`Usuário não encontrado`);
    }
    const payload = { id: usuario.id, email: usuario.email };
    const token = await this.jwtService.signAsync(payload);

    await this.emailService.sendEsqueceuSenha({
      nome: usuario.nome,
      email: usuario.email,
      url: `${process.env.URL}/#/senha/redefinir/${token}`,
    });
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

  async alterarSenha(id: number, body: AlterarSenhaPut) {
    const hash = await bcrypt.hash(body.senha, await bcrypt.genSalt());
    await this.usuarioService.alterarSenha(id, hash);
  }

  async renadaMensal(id: number, body: RendaMensalPut) {
    await this.usuarioService.rendaMensal(id, body.salario);
  }

  async atualizarUltimoAcesso(id: number) {
    await this.usuarioService.atualizarUltimoAcesso(id);
  }
}
