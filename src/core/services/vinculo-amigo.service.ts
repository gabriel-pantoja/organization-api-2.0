import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { VinculoAmigo } from 'src/database/entities/vinculo-amigo.entity';
import { EFriendStatus } from 'src/core/enums/friend-status.enum';
import { VinculoAmigoPost } from 'src/modules/amigo/request/vinculo-amigo.post';
import { DebitoCompartilhadoUsuarioService } from 'src/modules/debito-compartilhado-usuario/debito-compartilhado-usuario.service';

@Injectable()
export class VinculoAmigoService {
  constructor(
    @InjectRepository(VinculoAmigo)
    private repository: Repository<VinculoAmigo>,
    private readonly debitoCompartilhadoUsuarioService: DebitoCompartilhadoUsuarioService,
  ) {}

  async criar(body: VinculoAmigoPost) {
    const data = this.repository.create(body);
    data.status = EFriendStatus.Pending;
    return await this.repository.save(data);
  }

  async listar(request: Request) {
    return await this.repository.find({
      relations: { amigo: true, usuario: true },
      where: request.query,
    });
  }

  async listarPorAmigoId(amigoId: number) {
    return await this.repository.find({
      where: { amigoId },
    });
  }

  async obterId(id: number) {
    return await this.repository.findOne({
      relations: { amigo: true },
      where: { id },
    });
  }

  async obterPorUsuarioIdAmigoId(usuarioId: number, amigoId: number) {
    return await this.repository.findOne({
      where: { usuarioId, amigoId },
    });
  }

  async editarStatus(id: number) {
    const data = await this.repository.preload({
      id: id,
      status: EFriendStatus.Accepted,
    });
    if (!data) {
      throw new NotFoundException(`LinkedFriend ${id} not found`);
    }
    return await this.repository.save(data);
  }

  async deletar(id: number) {
    const data = await this.obterId(id);
    if (!data) {
      throw new NotFoundException(`LinkedFriend ${id} not found`);
    }
    const debito =
      await this.debitoCompartilhadoUsuarioService.obterPorUsuarioId(
        data.usuarioId,
      );
    if (debito) {
      throw new BadRequestException(`Debito vinculado este usuário`);
    }
    return await this.repository.remove(data);
  }
}
