import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
  Req,
} from '@nestjs/common';
import { VinculoDebitoUsuarioPost } from './request/vinculo-debito-usuario.post';
import { VinculoDebitoUsuarioPut } from './request/vinculo-debito-usuario.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { VinculoDebitoUsuarioDomain } from './vinculo-debito-usuario.domain';

@Controller('vinculo-debito-usuario')
export class VinculoDebitoUsuarioController {
  constructor(
    private readonly vinculoDebitoUsuarioDomain: VinculoDebitoUsuarioDomain,
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Editar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: VinculoDebitoUsuarioPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.vinculoDebitoUsuarioDomain.editar(+id, body));
  }
}
