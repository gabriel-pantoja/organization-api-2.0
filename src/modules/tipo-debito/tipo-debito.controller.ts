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
import { TipoDebitoPost } from './request/tipo-debito.post';
import { TipoDebitoPut } from './request/tipo-debito.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { TipoDebitoDomain } from './tipo-debito.domain';

@Controller('tipo-debito')
export class TipoDebitoController {
  constructor(private readonly tipoDebitoDomain: TipoDebitoDomain) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: TipoDebitoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.tipoDebitoDomain.criar(body));
  }

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
      .send(await this.tipoDebitoDomain.listar(request));
  }

  @Get(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.tipoDebitoDomain.obterPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: TipoDebitoPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.tipoDebitoDomain.editar(+id, body));
  }

  @Delete(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.tipoDebitoDomain.deletar(+id));
  }
}
