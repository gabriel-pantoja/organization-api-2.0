import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { FinancialControlService } from '../core/services/financial-control.service';
import { Response, Request } from 'express';
import { ProfileNameEnum } from 'src/core/enums/profile.enum';
import { Profiles } from 'src/core/decorators/profiles.decorator';

@Controller('financial-control')
export class FinancialControlController {
  constructor(
    private readonly financialControlService: FinancialControlService,
  ) {}

  @Get()
  @Profiles(ProfileNameEnum.Admin)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.financialControlService.findAll(request));
  }
}
