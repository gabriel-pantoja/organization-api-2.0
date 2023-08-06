import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
  Put,
} from '@nestjs/common';
import { LinkedFriendService } from '../core/services/linked-friend.service';
import { CreateLinkedFriendDto } from '../core/dtos/linked-friend/create-linked-friend.dto';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ProfileNameEnum } from 'src/core/enums/profile.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { FriendDto } from 'src/core/dtos/linked-friend/linked-friend.dto';
import { UpdateLinkedFriendDto } from 'src/core/dtos/linked-friend/update-linked-friend.dto';

@Controller('linked-friend')
export class LinkedFriendController {
  constructor(private readonly linkedFriendService: LinkedFriendService) {}

  @Post()
  @Profiles(ProfileNameEnum.Admin)
  @ApiOperation({ summary: 'Create Linked Friend' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createLinkedFriendDto: CreateLinkedFriendDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.linkedFriendService.create(createLinkedFriendDto));
  }

  @Get()
  @Profiles(ProfileNameEnum.Admin)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(
      (await this.linkedFriendService.findAll(request)).map((x) => {
        return FriendDto.toGetDto(x);
      }),
    );
  }

  @Get('selection')
  async findAllSelection(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(
      (await this.linkedFriendService.findAllSelection(request)).map((x) => {
        return FriendDto.toGetSelectDto(x);
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
      .send(await this.linkedFriendService.findOneById(+id));
  }

  @Put('status/:id')
  @Profiles(ProfileNameEnum.Admin)
  @ApiOperation({ summary: 'Update Status Linked Friend' })
  async uptadeStatus(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.linkedFriendService.updateStatus(+id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkedFriendService.remove(+id);
  }
}
