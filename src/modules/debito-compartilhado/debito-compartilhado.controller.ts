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
import { DebitoCompartilhadoPost } from './request/debito-compartilhado.post';
import { DebitoCompartilhadoPut } from './request/debito-compartilhado.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Request } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { DebitoCompartilhadoDomain } from './debito-compartilhado.domain';

@Controller('debito-compartilhado')
export class DebitoCompartilhadoController {
  constructor(
    private readonly debitoCompartilhadoDomain: DebitoCompartilhadoDomain,
  ) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: DebitoCompartilhadoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debitoCompartilhadoDomain.criar(body));
  }

  @Get()
  @ApiOperation({ summary: 'Listar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Profiles(ETipoPerfil.Admin)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoCompartilhadoDomain.listar(request));
  }

  @Get(':id')
  @Profiles(ETipoPerfil.Admin, ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Obter por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoCompartilhadoDomain.obterPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: DebitoCompartilhadoPut,
  ): Promise<Response> {
    await this.debitoCompartilhadoDomain.editar(+id, body);
    return res.status(HttpStatus.NO_CONTENT).send();
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
      .send(await this.debitoCompartilhadoDomain.deletar(+id));
  }
}
