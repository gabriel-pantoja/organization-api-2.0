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
import { VinculadoDomain } from './vinculado.domain';
import { VinculadoPost } from './request/vinculado.post';
import { VinculadoPut } from './request/vinculado.put';

@Controller('vinculado')
export class VinculadoController {
  constructor(private readonly vinculadoDomain: VinculadoDomain) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Vincular usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addPerson(
    @Res() res: Response,
    @Body() body: VinculadoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.vinculadoDomain.add(body));
  }

  @Get()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar Vinculados' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculadoDomain.listar(request));
  }

  @Get(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Usuário Vinculado por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculadoDomain.obterPessoaPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Usuário Vinculado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: VinculadoPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.vinculadoDomain.editarVinculado(+id, body));
  }

  @Delete(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar Usuário Vinculado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculadoDomain.deletarVinculado(+id));
  }

  @Get('reset-senha/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Reset Senha Usuário Vinculado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async resetPassword(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculadoDomain.resetSenhaVinculado(+id));
  }
}
