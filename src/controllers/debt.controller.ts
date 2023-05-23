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
} from '@nestjs/common';
import { DebtService } from '../core/services/debt.service';
import { CreateDebtDto } from '../core/dtos/debt/create-debt.dto';
import { UpdateDebtDto } from '../core/dtos/debt/update-debt.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  @ApiOperation({ summary: 'Create Debt' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createDebtDto: CreateDebtDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debtService.create(createDebtDto));
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.debtService.findAll());
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.debtService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Debt' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtService.update(+id, updateDebtDto));
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.debtService.remove(+id));
  }
}
