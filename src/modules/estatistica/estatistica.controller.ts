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
import { ETipoPerfil } from 'src/core/enums/perfil.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { EstatisticaDomain } from './estatistica.domain';

@Controller('estatistica')
export class EstatisticaController {
  constructor(private readonly estatisticaDomain: EstatisticaDomain) {}

  @Get('preco/:idProduto')
  @Profiles(ETipoPerfil.Admin)
  @ApiOperation({ summary: 'Listar Preco por Id Produto' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllPriceByProduct(
    @Res() res: Response,
    @Param('idProduto') idProduto: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.estatisticaDomain.listaPrecoPorIdProduto(+idProduto));
  }
}
