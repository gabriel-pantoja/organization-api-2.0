import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConvidarAmigoPost } from './request/convidar-amigo.post';
import { UsuarioService } from '../usuario/usuario.service';
import { VinculoAmigoService } from '../../core/services/vinculo-amigo.service';
import { EmailService } from 'src/core/services/email.service';
import { AmigoDto } from './dto/amigo.dto';
import { AdicionarAmigoPost } from './request/adicionar-amigo.post';
import { VinculoAmigoDto } from './dto/vinculo-amigo.dto';
import { Request } from 'express';

@Injectable()
export class AmigoDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly vinculoAmigoService: VinculoAmigoService,
    private readonly emailService: EmailService,
  ) {}

  async listarVinculo(request: Request) {
    return (await this.vinculoAmigoService.listar(request)).map((x) => {
      return VinculoAmigoDto.listar(x);
    });
  }

  async obterPorId(id: number) {
    return AmigoDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async obterEmail(email: string) {
    return AmigoDto.listarDto(
      await this.usuarioService.obterAmigoPorEmail(email),
    );
  }

  async add(body: AdicionarAmigoPost) {
    if (body.usuarioId == body.amigoId) {
      throw new BadRequestException(`can't be the same`);
    }

    const amigo = await this.usuarioService.obterPorId(body.amigoId);
    if (!amigo) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    const hasVinculo = await this.vinculoAmigoService.obterPorUsuarioIdAmigoId(
      body.usuarioId,
      amigo.id,
    );

    if (hasVinculo) {
      throw new BadRequestException(`Vinculo existente`);
    }

    await this.vinculoAmigoService.criar({
      usuarioId: body.usuarioId,
      amigoId: amigo.id,
    });
  }

  async convidar(body: ConvidarAmigoPost) {
    const amigo = await this.usuarioService.obterPorEmail(body.email);
    if (amigo) {
      throw new BadRequestException(`Vinculo existente`);
    }
    await this.emailService.sendConvidarAmigo({
      nome: amigo.nome,
      email: amigo.email,
      url: process.env.URL,
    });
  }

  async editarVinculoStatus(id: number) {
    return await this.vinculoAmigoService.editarStatus(id);
  }

  async deletarVinculo(id: number) {
    return await this.vinculoAmigoService.deletar(id);
  }
}
