import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { EditarSenhaPut } from './request/editar-senha.put';
import { Public } from 'src/core/decorators/public.decorator';
import { NovoUsuarioPost } from 'src/modules/usuario/request/novo-usuario.post';
import { CriarSenhaPost } from 'src/modules/usuario/request/criar-senha.post';
import { RedefinirSenhaPost } from 'src/modules/usuario/request/redefinir-senha.post';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { EntrarPlanoPut } from 'src/modules/usuario/request/entrar-plano.put';
import { UsuarioDomain } from './usuario.domain';
import { UsuarioPut } from './request/usuario.put';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioDomain: UsuarioDomain) {}

  @Get(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Pessoa por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.obterPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Pessoa' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UsuarioPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.usuarioDomain.editar(+id, body));
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Adicionar Novo Usuario' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async newUser(
    @Res() res: Response,
    @Body() body: NovoUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.usuarioDomain.add(body));
  }

  @Public()
  @Post('criar-senha')
  @ApiOperation({ summary: 'Criar Senha' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPassword(
    @Res() res: Response,
    @Body() body: CriarSenhaPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.criarSenha(body));
  }

  @Public()
  @Get('esqueceu-senha/:email')
  async forgotPassword(
    @Res() res: Response,
    @Param('email') email: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.esqueceuSenha(email));
  }

  @Public()
  @Post('redefinir-senha')
  @ApiOperation({ summary: 'Redefinir Senha' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async redefinePassword(
    @Res() res: Response,
    @Body() body: RedefinirSenhaPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.redefinirSenha(body));
  }

  @Put('editar-senha/:id')
  @ApiOperation({ summary: 'Editar Senha' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatePassword(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: EditarSenhaPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.editarSenha(+id, body));
  }

  @Put('entrar-plano/:id')
  @Profiles(ETipoPerfil.Usuario)
  @ApiOperation({ summary: 'Entrar Plano' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async joinPlan(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: EntrarPlanoPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.usuarioDomain.entrarPlano(+id, body));
  }
}
