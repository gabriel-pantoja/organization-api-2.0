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
import { GroupDto } from 'src/core/dtos/group/group.dto';
import { LinkedUserGroup } from 'src/data/entities/linked-user-group.entity';
import { CreateLinkedUserGroupDto } from 'src/core/dtos/linked-user-group/create-linked-user-group.dto';
import { LinkedUserGroupService } from 'src/core/services/linked-user-group.service';
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly linkedUserGroupService: LinkedUserGroupService,
  ) {}

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
      .send(GroupDto.toDto(await this.groupService.findById(+id)));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Group' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateGroupDto,
  ): Promise<Response> {
    // const userIdAdd: number[] = [];
    // updateUserDto.linkedUserGroup.forEach((x) => {
    //   if (userIds.find((i) => i != x.userId)) {
    //     userIdAdd.push(x.userId);
    //   }
    //   if (!userIds.length) {
    //     userIdAdd.push(x.userId);
    //   }
    // });
    // userIdAdd.forEach(async (userId) => {
    //   const linkedUserGroup: CreateLinkedUserGroupDto = {
    //     groupId: +id,
    //     userId: userId,
    //   };
    //   await this.linkedUserGroupService.create(linkedUserGroup);
    // });

    const data: LinkedUserGroup[] =
      await this.linkedUserGroupService.findAllByGroupId(+id);

    const userIds = data.map((x) => x.userId);
    const userIdremove: number[] = [];

    userIds.forEach((x) => {
      if (updateUserDto.linkedUserGroup.find((i) => i.userId != x)) {
        userIdremove.push(x);
      }
      if (!updateUserDto.linkedUserGroup.length) {
        userIdremove.push(x);
      }
    });

    userIdremove.forEach(async (userId) => {
      await this.linkedUserGroupService.removeByUserId(userId);
    });

    await this.groupService.update(+id, updateUserDto);
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.groupService.remove(+id));
  }
}
