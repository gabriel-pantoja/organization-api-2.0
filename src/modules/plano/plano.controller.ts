import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Res,
  HttpStatus,
  Get,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { PlanoDomain } from './plano.domain';
import { PessoaPlanoPost } from './request/pessoa-plano.post';
import { PessoaPlanoPut } from './request/pessoa-plano.put';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoDomain: PlanoDomain) {}

  @Post('pessoa')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Adicionar Pessoa' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addPerson(
    @Res() res: Response,
    @Body() body: PessoaPlanoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.planoDomain.add(body));
  }

  @Get('pessoa')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar Pessoa' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.planoDomain.listar(request));
  }

  @Get('pessoa/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Pessoa por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.planoDomain.obterPessoaPorId(+id));
  }

  @Put('pessoa/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Pessoa' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: PessoaPlanoPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.planoDomain.editarPessoaPlano(+id, body));
  }

  @Delete('pessoa/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar Pessoa' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.planoDomain.deletarPessoaPlano(+id));
  }

  @Get('pessoa/reset-senha/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Pessoa Reset Senha' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async resetPassword(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.planoDomain.resetSenhaPessoaPlano(+id));
  }
}
