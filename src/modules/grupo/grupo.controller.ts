import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
  Req,
} from '@nestjs/common';
import { GrupoPost } from './request/grupo.post';
import { GrupoPut } from './request/grupo.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { GrupoDomain } from './grupo.domain';

@Controller('grupo')
export class GroupController {
  constructor(private grupoDomain: GrupoDomain) {}

  @Post()
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: GrupoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.grupoDomain.criar(body));
  }

  @Get()
  @ApiOperation({ summary: 'Listar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.grupoDomain.listar(request));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.grupoDomain.obterPorId(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: GrupoPut,
  ): Promise<Response> {
    await this.grupoDomain.editar(+id, body);
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.grupoDomain.deletar(+id));
  }
}
