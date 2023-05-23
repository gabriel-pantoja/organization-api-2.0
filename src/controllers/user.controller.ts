import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { CreateUserDto } from '../core/dtos/user/create-user.dto';
import { UpdateUserDto } from '../core/dtos/user/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateUserPasswordDto } from '../core/dtos/user/update-user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.userService.create(createUserDto));
  }

  @Get('selection')
  async findAllSelection(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.findAllSelection());
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.userService.findAll());
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.userService.findById(+id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.update(+id, updateUserDto));
  }

  @Delete(':id')
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.userService.remove(+id));
  }

  @Post('update-password')
  async updatePassword(
    @Res() res: Response,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.updatePassword(updateUserPasswordDto));
  }
}
