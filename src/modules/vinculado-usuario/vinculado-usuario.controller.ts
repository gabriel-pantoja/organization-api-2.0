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
import { VinculadoUsuarioDomain } from './vinculado-usuario.domain';
import { VinculadoUsuarioPost } from './request/vinculado-usuario.post';
import { VinculadoUsuarioPut } from './request/vinculado-usuario.put';

@Controller('vinculado-usuario')
export class VinculadoUsuarioController {
  constructor(private readonly vinculadoUsuarioDomain: VinculadoUsuarioDomain) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Vincular usuário' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addPerson(
    @Res() res: Response,
    @Body() body: VinculadoUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.vinculadoUsuarioDomain.add(body));
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
      .send(await this.vinculadoUsuarioDomain.listar(request));
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
      .send(await this.vinculadoUsuarioDomain.obterPessoaPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Usuário Vinculado' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: VinculadoUsuarioPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.vinculadoUsuarioDomain.editarVinculado(+id, body));
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
      .send(await this.vinculadoUsuarioDomain.deletarVinculado(+id));
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
      .send(await this.vinculadoUsuarioDomain.resetSenhaVinculado(+id));
  }
}
