import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
  Put,
} from '@nestjs/common';
import { VinculoAmigoPost } from './request/vinculo-amigo.post';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { VinculoAmigoDomain } from './vinculo-amigo.domain';

@Controller('vinculo-amigo')
export class VinculoAmigoController {
  constructor(private readonly vinculoAmigoDomain: VinculoAmigoDomain) {}

  @Post()
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Criar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() body: VinculoAmigoPost,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.vinculoAmigoDomain.criar(body));
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
      .send(await this.vinculoAmigoDomain.listar(request));
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
      .send(await this.vinculoAmigoDomain.obterPorId(+id));
  }

  @Put('status/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Editar Status' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updateStatus(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.vinculoAmigoDomain.editarStatus(+id));
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
      .send(await this.vinculoAmigoDomain.deletar(+id));
  }
}
