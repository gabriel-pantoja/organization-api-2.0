import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/core/decorators/public.decorator';
import { AuthDomain } from './auth.domain';

@Controller('auth')
export class AuthController {
  constructor(private readonly authDomain: AuthDomain) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async signIn(@Res() res: Response, @Body() body: Record<string, any>) {
    return res
      .status(HttpStatus.OK)
      .send(await this.authDomain.signIn(body.email, body.senha));
  }
}
