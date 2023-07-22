import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { FinancialControlService } from '../core/services/financial-control.service';
import { Response, Request } from 'express';

@Controller('financial-control')
export class FinancialControlController {
  constructor(
    private readonly financialControlService: FinancialControlService,
  ) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.financialControlService.findAll(request));
  }
}
