import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VinculoAmigoPost } from './request/vinculo-amigo.post';
import { Request } from 'express';
import { VinculoAmigoService } from './vinculo-amigo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { EPerfil } from 'src/core/enums/perfil.enum';
import { EFriendStatus } from 'src/core/enums/friend-status.enum';
import { VinculoAmigoDto } from './dto/vinculo-amigo.dto';

@Injectable()
export class VinculoAmigoDomain {
  constructor(
    private readonly vinculoAmigoService: VinculoAmigoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async criar(body: VinculoAmigoPost) {
    if (body.usuarioId == body.amigoId) {
      throw new BadRequestException(`can't be the same`);
    }
    const user = await this.usuarioService.obterPorId(body.usuarioId);
    if (!user) {
      throw new NotFoundException(`User ${body.usuarioId} not found`);
    }

    if (user.perfilId != EPerfil.Admin) {
      throw new BadRequestException(`User ${body.usuarioId} no have plan`);
    }

    const hasLinkedFriend =
      await this.vinculoAmigoService.obterPorUsuarioIdAmigoId(
        body.usuarioId,
        body.amigoId,
      );
    if (hasLinkedFriend) {
      throw new BadRequestException(`Friend ${body.amigoId} exist`);
    }

    const linkedFriendList = await this.vinculoAmigoService.listarPorAmigoId(
      body.usuarioId,
    );

    linkedFriendList.forEach((x) => {
      if (x.usuarioId === body.amigoId) {
        if (x.status === EFriendStatus.Pending) {
          throw new BadRequestException(`Amigo ${body.amigoId} pending`);
        } else if (x.status === EFriendStatus.Accepted) {
          throw new BadRequestException(`Amigo ${body.amigoId} accepted`);
        }
      }
    });

    const friend = await this.usuarioService.obterPorId(body.amigoId);
    if (!friend) {
      throw new NotFoundException(`User ${body.amigoId} not found`);
    }

    if (friend.perfilId != EPerfil.Admin) {
      throw new BadRequestException(`Friend ${body.amigoId} no have plan`);
    }

    return this.vinculoAmigoService.criar(body);
  }

  async listar(request: Request) {
    return (await this.vinculoAmigoService.listar(request)).map((x) => {
      return VinculoAmigoDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return await this.vinculoAmigoService.obterId(id);
  }

  async editarStatus(id: number) {
    return await this.vinculoAmigoService.editarStatus(id);
  }

  async deletar(id: number) {
    return await this.vinculoAmigoService.deletar(id);
  }
}
