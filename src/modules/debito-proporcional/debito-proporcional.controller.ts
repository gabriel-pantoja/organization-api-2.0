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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Request } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { DebitoProporcionalDomain } from './debito-proporcional.domain';
import { DebitoProporcionalPost } from './request/debito-proporcional.post';
import { DebitoProporcionalPut } from './request/debito-proporcional.put';
import { PagarPut } from './request/pagar.put';
import { UsuarioVinculadoDebitoProporcionalPost } from './request/usuario-vinculado-debito-proporcional.post';

@Controller('debito-proporcional')
export class DebitoProporcionalController {
  constructor(
    private readonly debitoProporcionalDomain: DebitoProporcionalDomain,
  ) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: DebitoProporcionalPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debitoProporcionalDomain.criar(body));
  }

  @Post('usuario-vinculado')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createUsuarioVinculado(
    @Res() res: Response,
    @Body() body: UsuarioVinculadoDebitoProporcionalPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debitoProporcionalDomain.criarUsuarioVinculado(body));
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
      .send(await this.debitoProporcionalDomain.listar(request));
  }

  @Get('usuario-vinculado')
  @ApiOperation({ summary: 'Listar Usuario Vinculado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Profiles(ETipoPerfil.Admin)
  async findAllUsuarioVinculado(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(
        await this.debitoProporcionalDomain.listarUsuarioVinculado(request),
      );
  }

  @Get('select-nome')
  @ApiOperation({ summary: 'Select Nome' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Profiles(ETipoPerfil.Admin)
  async findAllNome(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalDomain.selectNome());
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
      .send(await this.debitoProporcionalDomain.obterPorId(+id));
  }

  @Get('usuario-vinculado/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Usuário Vinculado por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneVinculado(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalDomain.obterPorUsuarioVincladoId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: DebitoProporcionalPut,
  ): Promise<Response> {
    await this.debitoProporcionalDomain.editar(+id, body);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Put('pagar/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Pagar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async pay(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: PagarPut,
  ): Promise<Response> {
    await this.debitoProporcionalDomain.pagar(+id, body);
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
      .send(await this.debitoProporcionalDomain.deletar(+id));
  }

  @Delete('usuario-vinculado/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar por Usuario Vinculado Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async removeUsuarioVInculado(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoProporcionalDomain.deletarUsuarioVinculado(+id));
  }
}
