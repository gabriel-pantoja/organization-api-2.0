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
import { DebitoProporcionalUsuarioPut } from './request/debito-proporcional-usuario.put';

@Controller('debito-proporcional-usuario')
export class DebitoPropocionalUsuarioController {
  constructor(
    private readonly debitoProporcionalUsuarioDomain: DebitoProporcionalUsuarioDomain,
  ) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Adicionar usuário' })
  async add(
    @Res() res: Response,
    @Body() body: DebitoProporcionalUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debitoProporcionalUsuarioDomain.add(body));
  }

  @Get()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar Usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async get(@Res() res: Response, @Req() request: Request): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalUsuarioDomain.get(request));
  }

  @Get(':id')
  @Profiles(ETipoPerfil.Admin, ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Obter por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalUsuarioDomain.getById(+id));
  }

  @Get('usuario/:id')
  @Profiles(ETipoPerfil.Admin, ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Obter por Usuario Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getByUsuarioId(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalUsuarioDomain.getByUsuarioId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async put(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: DebitoProporcionalUsuarioPut,
  ): Promise<Response> {
    await this.debitoProporcionalUsuarioDomain.put(+id, body);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalUsuarioDomain.delete(+id));
  }
}
