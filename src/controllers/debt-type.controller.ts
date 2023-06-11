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
import { DebtTypeService } from '../core/services/debt-type.service';
import { CreateDebtTypeDto } from '../core/dtos/debt-type/create-debt-type.dto';
import { UpdateDebtTypeDto } from '../core/dtos/debt-type/update-debt-type.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('debt-type')
export class DebtTypeController {
  constructor(private readonly debtTypeService: DebtTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create DebtType' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createDebtTypeDto: CreateDebtTypeDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.debtTypeService.create(createDebtTypeDto));
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtTypeService.findAll(request));
  }

  @Get('selection')
  async findAllSelection(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtTypeService.findAllSelection());
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtTypeService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Debt' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateDebtTypeDto: UpdateDebtTypeDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtTypeService.update(+id, updateDebtTypeDto));
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.debtTypeService.remove(+id));
  }
}
