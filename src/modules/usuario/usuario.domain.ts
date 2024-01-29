import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EditarSenhaPut } from './request/editar-senha.put';
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

@Injectable()
export class UsuarioDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly mensalidadeService: MensalidadeService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async add(body: NovoUsuarioPost) {
    const data = await this.usuarioService.addNovoUsuaio(body);

    this.mensalidadeService.criar({
      usuarioId: data.id,
      formaPagamento: body.formaPagamento,
      pago: true,
      vencimento: new Date(),
    });

    const payload = { id: data.id, email: data.email };
    const token = await this.jwtService.signAsync(payload);

    await this.emailService.sendNovaSenha({
      nome: data.nome,
      email: data.email,
      url: `${process.env.URL}/#/senha/criar/${token}`,
    });
  }

  async obterPorId(id: number) {
    return UsuarioDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async editar(id: number, body: UsuarioPut) {
    return await this.usuarioService.editar(id, body);
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

  async editarSenha(id: number, body: EditarSenhaPut) {
    const hash = await bcrypt.hash(body.senha, await bcrypt.genSalt());
    await this.usuarioService.editarSenha(id, hash);
  }

  async atualizarUltimoAcesso(id: number) {
    await this.usuarioService.atualizarUltimoAcesso(id);
  }
}
