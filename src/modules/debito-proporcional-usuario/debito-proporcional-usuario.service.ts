import { Injectable, NotFoundException } from '@nestjs/common';
import { DebitoProporcionalUsuarioPost } from './request/debito-proporcional-usuario.post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { DebitoProporcionalUsuario } from 'src/database/entities/debito-proporcioal-usuario';

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
}
