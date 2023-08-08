import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Profiles } from 'src/core/decorators/profiles.decorator';
import { PaymentDomanin } from 'src/core/domain/payment.domain';
import { ProfileNameEnum } from 'src/core/enums/profile.enum';
import { Response, Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentDomanin: PaymentDomanin) {}

  @Get()
  @Profiles(ProfileNameEnum.Admin, ProfileNameEnum.Usuario)
  async findAll(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.paymentDomanin.findAll(request));
  }
}
