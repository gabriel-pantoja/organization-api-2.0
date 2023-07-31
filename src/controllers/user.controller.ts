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
  Req,
} from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { CreateUserDto } from '../core/dtos/user/create-user.dto';
import { UpdateUserDto } from '../core/dtos/user/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { UpdateUserPasswordDto } from '../core/dtos/user/update-user-password.dto';
import { UserDto } from 'src/core/dtos/user/user.dto';
import { Public } from 'src/core/decorators/public.decorator';
import { CreateNewUserDto } from 'src/core/dtos/user/create-new-user.dto';
import { CreateUserPasswordDto } from 'src/core/dtos/user/create-user-password.dto';
import { RedefineUserPasswordDto } from 'src/core/dtos/user/redefine-user-password.dto';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { ProfileNameEnum } from 'src/core/enums/profile.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Profiles(ProfileNameEnum.Admin)
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

  @Public()
  @Post('new')
  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async newUser(
    @Res() res: Response,
    @Body() createUserDto: CreateNewUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.CREATED)
      .send(await this.userService.newUser(createUserDto));
  }

  @Get()
  @Profiles(ProfileNameEnum.Admin)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.findAll(request));
  }

  @Get('selection')
  async findAllSelection(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(
      (await this.userService.findAllSelection(request)).map((x) => {
        return UserDto.toSelectDto(x);
      }),
    );
  }

  @Get(':id')
  @Profiles(ProfileNameEnum.Admin)
  async findOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.userService.findById(+id));
  }

  @Get('reset-password/:id')
  @Profiles(ProfileNameEnum.Admin)
  async resetPassword(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.resetPassword(+id));
  }

  @Public()
  @Get('forgot-password/:email')
  async forgotPassword(
    @Res() res: Response,
    @Param('email') email: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.forgotPassword(email));
  }

  @Put(':id')
  @Profiles(ProfileNameEnum.Admin)
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.NO_CONTENT)
      .send(await this.userService.update(+id, updateUserDto));
  }

  @Delete(':id')
  @Profiles(ProfileNameEnum.Admin)
  async remove(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res.status(HttpStatus.OK).send(await this.userService.remove(+id));
  }

  @Public()
  @Post('create-password')
  async createPassword(
    @Res() res: Response,
    @Body() createUserPasswordDto: CreateUserPasswordDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.createPassword(createUserPasswordDto));
  }

  @Public()
  @Post('redefine-password')
  async redefinePassword(
    @Res() res: Response,
    @Body() redefineUserPasswordDto: RedefineUserPasswordDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.redefinePassword(redefineUserPasswordDto));
  }

  @Put('update-password/:id')
  @ApiOperation({ summary: 'Update User Password' })
  async updatePassword(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.userService.updatePassword(+id, updateUserPasswordDto));
  }
}
