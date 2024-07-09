import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { HomeService } from './home.service';

@Injectable()
export class HomeDomanin {
  constructor(private readonly homeService: HomeService) {}

  async get(request: Request) {
    const debitoCompartilhadoList =
      await this.homeService.getDebitoCompartilhado(request);
    const meuDebitoList = await this.homeService.getMeuDebito(request);

    return {
      debitoCompartilhado: debitoCompartilhadoList,
      meuDebito: meuDebitoList,
    };
  }
}
