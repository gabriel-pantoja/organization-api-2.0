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
import { VinculoDebitoUsuarioPost } from './request/vinculo-debito-usuario.post';
import { VinculoDebitoUsuarioPut } from './request/vinculo-debito-usuario.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { VinculoDebitoUsuarioDomain } from './vinculo-debito-usuario.domain';

@Controller('vinculo-debito-usuario')
export class VinculoDebitoUsuarioController {
  constructor(
    private readonly vinculoDebitoUsuarioDomain: VinculoDebitoUsuarioDomain,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: VinculoDebitoUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.vinculoDebitoUsuarioDomain.criar(body));
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
      .send(await this.vinculoDebitoUsuarioDomain.listar(request));
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
      .send(await this.vinculoDebitoUsuarioDomain.obterPorId(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: VinculoDebitoUsuarioPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoDebitoUsuarioDomain.editar(+id, body));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoDebitoUsuarioDomain.deletar(+id));
  }
}
