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
import { LinkedUserGroupService } from '../core/services/linked-user-group.service';
import { CreateLinkedUserGroupDto } from '../core/dtos/linked-user-group/create-linked-user-group.dto';
import { UpdateLinkedUserGroupDto } from '../core/dtos/linked-user-group/update-linked-user-group.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LinkedUserGroupDto } from 'src/core/dtos/linked-user-group/linked-user-group.dto';

@Controller('linked-user-group')
export class LinkedUserGroupController {
  constructor(
    private readonly linkedUserGroupService: LinkedUserGroupService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User Group' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createLinkedUserGroupDto: CreateLinkedUserGroupDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.linkedUserGroupService.create(createLinkedUserGroupDto));
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.linkedUserGroupService.findAll());
  }

  @Get('selection')
  async findAllSelection(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).send(
      (await this.linkedUserGroupService.findAllSelection()).map((x) => {
        return LinkedUserGroupDto.toSelectDto(x);
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
      .send(await this.linkedUserGroupService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User Group' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateLinkedUserGroupDto: UpdateLinkedUserGroupDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(
        await this.linkedUserGroupService.update(+id, updateLinkedUserGroupDto),
      );
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.linkedUserGroupService.remove(+id));
  }
}
