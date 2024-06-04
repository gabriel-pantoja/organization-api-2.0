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
import { DebitoCompartilhadoUsuarioPut } from './request/debito-compartilhado-usuario.put';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { DebitoCompartilhadoUsuarioDomain } from './debito-compartilhado-usuario.domain';

@Controller('debito-compartilhado-usuario')
export class DebitoCompartilhadoUsuarioController {
  constructor(
    private readonly debitoCompartilhadoUsuarioDomain: DebitoCompartilhadoUsuarioDomain,
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Editar' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: DebitoCompartilhadoUsuarioPut,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debitoCompartilhadoUsuarioDomain.editar(+id, body));
  }
}
