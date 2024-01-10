import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvidarAmigoPost } from './request/convidar-amigo.post';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AmigoDomain {
  constructor(private readonly usuarioService: UsuarioService) {}

  async obterEmail(email: string) {
    return await this.usuarioService.obterAmigoPorEmail(email);
  }

  async resetSenha(id: number) {
    const usuario = await this.usuarioService.obterPorId(id);
    if (!usuario) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const hash = await bcrypt.hash(
      usuario.nome.toUpperCase(),
      await bcrypt.genSalt(),
    );
    await this.usuarioService.resetSenha(id, hash);
  }

  convidar(body: ConvidarAmigoPost) {
    return { message: `${body.email} e-mail enviado!` };
  }
}
