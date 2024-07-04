import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { NovoUsuarioPost } from './request/novo-usuario.post';
import { EntrarPlanoPut } from './request/entrar-plano.put';
import { Usuario } from 'src/database/entities/usuario.entity';
import { EPerfil } from 'src/core/enums/perfil.enum';
import { UsuarioPut } from './request/usuario.put';
import { DebitoCompartilhadoUsuarioService } from '../debito-compartilhado-usuario/debito-compartilhado-usuario.service';
import { VinculadoUsuarioPost } from '../vinculado-usuario/request/vinculado-usuario.post';
import { VinculadoUsuarioPut } from '../vinculado-usuario/request/vinculado-usuario.put';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
    private debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
  ) {}

  async addVinculado(body: VinculadoUsuarioPost): Promise<Usuario> {
    const data = this.repository.create(body);
    data.email = data.email.toLowerCase();
    data.perfilId = EPerfil.Usuario;
    data.ativo = true;
    return await this.repository.save(data);
  }

  async addNovoUsuaio(body: NovoUsuarioPost) {
    body.email = body.email.toLowerCase();
    const data = this.repository.create(body);
    data.perfilId = EPerfil.Admin;

    return await this.repository.save(data);
  }

  async listar(request: Request) {
    return await this.repository.find({
      where: request.query,
    });
  }

  async obterPorId(id: number) {
    return await this.repository.findOne({
      relations: { usuarios: true },
      where: { id },
    });
  }

  async obterPorEmail(email: string) {
    return await this.repository.findOne({
      relations: { mensalidade: true, perfil: true },
      where: { email },
    });
  }

  async obterAmigoPorEmail(email: string) {
    return await this.repository.findOne({
      where: { email, usuarioId: null, perfilId: EPerfil.Admin },
    });
  }

  async resetSenhaVinculado(id: number, senha): Promise<any> {
    const data = await this.repository.preload({
      id: id,
      senha: senha,
    });
    this.repository.save(data);
  }

  async editar(id: number, body: UsuarioPut): Promise<Usuario> {
    body.email = body.email.toLowerCase();
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async editarVinculado(
    id: number,
    body: VinculadoUsuarioPut,
  ): Promise<Usuario> {
    body.email = body.email.toLowerCase();
    const data = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async entrarPlano(id: number, body: EntrarPlanoPut): Promise<Usuario> {
    const data = await this.repository.preload({
      id: id,
      perfilId: EPerfil.Admin,
      ...body,
    });

    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async deletarVinculado(id: number): Promise<any> {
    const data = await this.obterPorId(id);
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }
    const debito =
      await this.debitoCompartilhadoUsuarioService.obterPorUsuarioId(id);
    if (debito) {
      throw new BadRequestException(`Debito vinculado este usuário`);
    }
    return await this.repository.remove(data);
  }

  async criarSenha(id: number, hash: string): Promise<void> {
    const data = await this.repository.preload({
      id: id,
      senha: hash,
      ativo: true,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.repository.save(data);
  }

  async redefinirSenha(id: number, hash: string): Promise<void> {
    const data = await this.repository.preload({
      id: id,
      senha: hash,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.repository.save(data);
  }

  async alterarSenha(id: number, hash: string): Promise<void> {
    const data = await this.repository.preload({
      id: id,
      senha: hash,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.repository.save(data);
  }

  async rendaMensal(id: number, salario: number): Promise<void> {
    const data = await this.repository.preload({
      id: id,
      salario: salario,
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.repository.save(data);
  }

  async atualizarUltimoAcesso(id: number): Promise<void> {
    const data = await this.repository.preload({
      id: id,
      ultimoAcesso: new Date(),
    });
    if (!data) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.repository.save(data);
  }

  async listarPorUsuarioId(usuarioId: number) {
    return await this.repository.find({
      where: { usuarioId },
    });
  }
}
