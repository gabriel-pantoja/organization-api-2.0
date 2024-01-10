import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsuarioPost } from './request/usuario.post';
import { UsuarioPut } from './request/usuario.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { EditarSenhaPut } from './request/editar-senha.put';
import { Public } from 'src/core/decorators/public.decorator';
import { NovoUsuarioPost } from 'src/modules/usuario/request/novo-usuario.post';
import { CriarSenhaPost } from 'src/modules/usuario/request/criar-senha.post';
import { RedefinirSenhaPost } from 'src/modules/usuario/request/redefinir-senha.post';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { ConvidarAmigoPost } from 'src/modules/amigo/request/convidar-amigo.post';
import { EntrarPlanoPut } from 'src/modules/usuario/request/entrar-plano.put';
import { UsuarioDomain } from './usuario.domain';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioDomain: UsuarioDomain) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: UsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.usuarioDomain.criar(body));
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
      .send(await this.usuarioDomain.listar(request));
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
      .send(await this.usuarioDomain.obterPorId(+id));
  }

  @Put(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar' })
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

  @Delete(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.usuarioDomain.deletar(+id));
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

  @Public()
  @Post('novo-usuario')
  @ApiOperation({ summary: 'Novo Usuario' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async newUser(
    @Res() res: Response,
    @Body() body: NovoUsuarioPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.usuarioDomain.novoUsuario(body));
  }
}
