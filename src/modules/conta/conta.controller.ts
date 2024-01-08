import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ContaDomanin } from 'src/modules/conta/conta.domain';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaDomanin: ContaDomanin) {}

  @Get()
  @Profiles(ETipoPerfil.Admin, ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Listar' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.contaDomanin.listar(request));
  }
}
