import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { MensalidadeDomain } from './mensalidade.domain';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('mensalidade')
export class MensalidadeController {
  constructor(private readonly mensalidadeDomain: MensalidadeDomain) {}

  @Get()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.mensalidadeDomain.listar(request));
  }
}
