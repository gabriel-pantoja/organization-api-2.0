import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ConvidarAmigoPost } from './request/convidar-amigo.post';
import { AmigoDomain } from './amigo.domain';
import { AdicionarAmigoPost } from './request/adicionar-amigo.post';

@Controller('amigo')
export class AmigoController {
  constructor(private readonly amigoDomain: AmigoDomain) {}

  @Get('vinculo/listar')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.listarVinculo(request));
  }

  @Get(':id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Informações do Amigo por Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.obterPorId(+id));
  }

  @Get('email/:email')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Obter Amigo por E-mail' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findFriend(
    @Res() res: Response,
    @Param('email') email: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.obterEmail(email));
  }

  @Post('adicionar-amizade')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Adicionar Amigo' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async add(
    @Res() res: Response,
    @Body() body: AdicionarAmigoPost,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.amigoDomain.add(body));
  }

  @Post('convidar')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Convidar Amigo' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async invite(
    @Res() res: Response,
    @Body() body: ConvidarAmigoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.convidar(body));
  }

  @Put('vinculo/status/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Vinculo Status' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateVinculoStatus(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.amigoDomain.editarVinculoStatus(+id));
  }

  @Delete('vinculo/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Deletar Vinculo' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async removeVinculo(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.deletarVinculo(+id));
  }
}
