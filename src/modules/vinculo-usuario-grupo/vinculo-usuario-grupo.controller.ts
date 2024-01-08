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
} from '@nestjs/common';
import { VinculoUsuarioGrupoPost } from './request/vinculo-usuario-grupo.post';
import { VinculoUsuarioGrupoPut } from './request/vinculo-usuario-grupo.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { VinculoUsuarioGrupoDomain } from './vinculo-usuario-grupo.domain';

@Controller('vinculo-usuario-grupo')
export class VinculoUsuarioGrupoController {
  constructor(
    private readonly vinculoUsuarioGrupoDomain: VinculoUsuarioGrupoDomain,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User Group' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: VinculoUsuarioGrupoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.vinculoUsuarioGrupoDomain.criar(body));
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoUsuarioGrupoDomain.listar());
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoUsuarioGrupoDomain.obterPorId(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User Group' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: VinculoUsuarioGrupoPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoUsuarioGrupoDomain.editar(+id, body));
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoUsuarioGrupoDomain.deletar(+id));
  }
}
