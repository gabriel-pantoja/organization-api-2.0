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
import { DebtService } from '../core/services/debt.service';
import { CreateDebtDto } from '../core/dtos/debt/create-debt.dto';
import { UpdateDebtDto } from '../core/dtos/debt/update-debt.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPaginatedResponse } from 'src/core/decorators/paginated.decorator';
import { DebtDto } from 'src/core/dtos/debt/debt.dto';
import { Request } from 'express';
import { LinkedDebtUserService } from 'src/core/services/linked-debt-user.service';
import { LinkedDebtUser } from 'src/data/entities/linked-debt-user.entity';

@Controller('debt')
export class DebtController {
  constructor(
    private readonly debtService: DebtService,
    private readonly linkedDebtUserService: LinkedDebtUserService,
  ) {}

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
  //@ApiPaginatedResponse(DebtDto)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(
      (await this.debtService.findAll(request)).map((x) => {
        return DebtDto.toDto(x);
      }),
    );
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(DebtDto.toDto(await this.debtService.findById(+id)));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Debt' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
  ): Promise<Response> {
    const data: LinkedDebtUser[] =
      await this.linkedDebtUserService.findAllByDebtId(+id);

    const userIds = data.map((x) => x.userId);
    const userIdremove: number[] = [];

    userIds.forEach((x) => {
      if (!updateDebtDto.linkedDebtUser.find((i) => i.userId == x)) {
        userIdremove.push(x);
      }
      if (!updateDebtDto.linkedDebtUser.length) {
        userIdremove.push(x);
      }
    });

    userIdremove.forEach(async (userId) => {
      await this.linkedDebtUserService.removeByUserId(userId);
    });

    await this.debtService.update(+id, updateDebtDto);
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.debtService.remove(+id));
  }
}
