import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { NotificarDomain } from './notificar.domain';

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
