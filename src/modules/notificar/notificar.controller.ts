import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { NotificarDomain } from './notificar.domain';
import { DebitoAtrasadoPost } from './request/debito-atrasado.post';
import { PrazoLimitePost } from './request/prazo-limite.post';

@Controller('notificar')
export class NotificarController {
  constructor(private readonly notificarDomain: NotificarDomain) {}

  @Get('via-email/:email')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Via E-mail' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async viaEmail(
    @Res() res: Response,
    @Param('email') email: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.notificarDomain.viaEmail(email));
  }

  @Post('via-email-debito-atrasado')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Via E-mail Debito Atrasado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async viaEmailDebitoAtrasado(
    @Res() res: Response,
    @Body() body: DebitoAtrasadoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.notificarDomain.viaEmailDebitoAtrasado(body));
  }

  @Post('via-email-prazo-limite')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Via E-mail Prazo Limite' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async viaEmailPrazoLimite(
    @Res() res: Response,
    @Body() body: PrazoLimitePost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.notificarDomain.viaEmailPrazoLimite(body));
  }

  @Get('via-whatsapp/:numero')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Via Whatsapp' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async viaWhatsapp(
    @Res() res: Response,
    @Param('numero') numero: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.notificarDomain.viaWhatsapp(numero));
  }
}
