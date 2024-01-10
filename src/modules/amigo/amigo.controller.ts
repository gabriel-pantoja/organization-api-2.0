import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ConvidarAmigoPost } from './request/convidar-amigo.post';
import { AmigoDomain } from './amigo.domain';

@Controller('amigo')
export class AmigoController {
  constructor(private readonly amigoDomain: AmigoDomain) {}

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

  @Get('reset-senha/:id')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Reset Senha' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async resetPassword(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.amigoDomain.resetSenha(+id));
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
}
