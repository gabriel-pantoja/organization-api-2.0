import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { DebitoProporcionalUsuarioDomain } from './debito-proporcional-usuario.domain';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { DebitoProporcionalUsuarioPost } from './request/debito-proporcional-usuario.post';

@Controller('debito-proporcional-usuario')
export class DebitoPropocionalUsuarioController {
  constructor(
    private readonly debitoProporcionalUsuarioDomain: DebitoProporcionalUsuarioDomain,
  ) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Adicionar usuário' })
  async newUser(
    @Res() res: Response,
    @Body() body: DebitoProporcionalUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debitoProporcionalUsuarioDomain.add(body));
  }
}
