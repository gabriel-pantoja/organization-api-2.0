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
import { LinkedDebtUserService } from '../core/services/linked-debt-user.service';
import { CreateLinkedDebtUserDto } from '../core/dtos/linked-debt-user/create-linked-debt-user.dto';
import { UpdateLinkedDebtUserDto } from '../core/dtos/linked-debt-user/update-linked-debt-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('linked-debt-user')
export class LinkedDebtUserController {
  constructor(private readonly linkedDebtUserService: LinkedDebtUserService) {}

  @Post()
  @ApiOperation({ summary: 'LinkedUserDebt Debt' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createLinkedDebtUserDto: CreateLinkedDebtUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.linkedDebtUserService.create(createLinkedDebtUserDto));
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.linkedDebtUserService.findAll(request));
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.linkedDebtUserService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Debt' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateLinkedDebtUserDto: UpdateLinkedDebtUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(
        await this.linkedDebtUserService.update(+id, updateLinkedDebtUserDto),
      );
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.linkedDebtUserService.remove(+id));
  }
}
