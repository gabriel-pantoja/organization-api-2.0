import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConvidarAmigoPost } from './request/convidar-amigo.post';
import { UsuarioService } from '../usuario/usuario.service';
import { VinculoAmigoService } from '../vinculo-amigo/vinculo-amigo.service';
import { EmailService } from 'src/core/services/email.service';
import { AmigoDto } from './dto/amigo.dto';
import { AdicionarAmigoPost } from './request/adicionar-amigo.post';

@Injectable()
export class AmigoDomain {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly vinculoAmigoService: VinculoAmigoService,
    private readonly emailService: EmailService,
  ) {}

  async obterPorId(id: number) {
    return AmigoDto.listarDto(await this.usuarioService.obterPorId(+id));
  }

  async obterEmail(email: string) {
    return await this.usuarioService.obterAmigoPorEmail(email);
  }

  async add(body: AdicionarAmigoPost) {
    const amigo = await this.usuarioService.obterPorEmail(body.email);
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
      url: 'http://localhost:4200/#/novo-usuario',
    });
  }
}
