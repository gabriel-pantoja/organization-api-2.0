import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoProporcionalUsuarioPost } from './request/debito-proporcional-usuario.post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoProporcionalUsuario } from 'src/database/entities/debito-proporcioal-usuario';
import { DebitoProporcionalUsuarioPut } from './request/debito-proporcional-usuario.put';

@Injectable()
export class DebitoProporcionalUsuarioService {
  constructor(
    @InjectRepository(DebitoProporcionalUsuario)
    private repository: Repository<DebitoProporcionalUsuario>,
  ) {}

  async add(body: DebitoProporcionalUsuarioPost) {
    const data = this.repository.create(body);
    return await this.repository.save(data);
  }

  async get(request: Request): Promise<DebitoProporcionalUsuario[]> {
    return await this.repository.find({
      where: request.query,
    });
  }

  async getById(id: number): Promise<DebitoProporcionalUsuario> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async getByUsuarioId(
    usuarioId: number,
  ): Promise<DebitoProporcionalUsuario[]> {
    return await this.repository.find({
      where: { usuarioId },
    });
  }

  async put(id: number, body: DebitoProporcionalUsuarioPut) {
    const debito = await this.repository.preload({
      id: id,
      ...body,
    });
    if (!debito) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.save(debito);
  }

  async delete(id: number) {
    const debito = await this.getById(id);
    if (!debito) {
      throw new NotFoundException(`Debt ${id} not found`);
    }
    return this.repository.remove(debito);
  }
}
