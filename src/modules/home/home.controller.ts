import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HomeDomanin } from './home.domain';

@Controller('home')
export class HomeController {
  constructor(private readonly homeDomanin: HomeDomanin) {}

  @Get()
  @Profiles(ETipoPerfil.Admin, ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Listar' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.homeDomanin.get(request));
  }
}
