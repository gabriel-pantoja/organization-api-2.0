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
import { AuthService } from 'src/core/services/auth.service';
import { Response } from 'express';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async signIn(@Res() res: Response, @Body() signInDto: Record<string, any>) {
    return res
      .status(HttpStatus.OK)
      .send(
        await this.authService.signIn(signInDto.userName, signInDto.password),
      );
  }

  @Get('reset-password/:id')
  async resetPassword(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.authService.resetPassword(+id));
  }
}
