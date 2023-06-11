import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
  Req,
} from '@nestjs/common';
import { GroupService } from '../core/services/group.service';
import { CreateGroupDto } from '../core/dtos/group/create-group.dto';
import { UpdateGroupDto } from '../core/dtos/group/update-group.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create Group' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.groupService.create(createGroupDto));
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.groupService.findAll(request));
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.groupService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Group' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateGroupDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.groupService.update(+id, updateUserDto));
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.groupService.remove(+id));
  }
}
