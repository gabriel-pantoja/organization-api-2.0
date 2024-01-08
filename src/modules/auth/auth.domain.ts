import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { MensalidadeService } from '../mensalidade/mensalidade.service';

@Injectable()
export class AuthDomain {
  constructor(
    private usuarioService: UsuarioService,
    private mensalidadeService: MensalidadeService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.obterPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException();
    }

    if (!usuario.ativo) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(senha, usuario.senha))) {
      throw new UnauthorizedException();
    }

    if (usuario.usuarioId == null || usuario.planoId != null) {
      const financialControl = usuario.mensalidade.find(
        (x) =>
          x.vencimento.getMonth() == new Date().getMonth() &&
          x.vencimento.getFullYear() == new Date().getFullYear(),
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!financialControl) {
        const lastFinancialControl = usuario.mensalidade.pop();
        const nextDatePayment = new Date(lastFinancialControl.vencimento);
        nextDatePayment.setMonth(nextDatePayment.getMonth() + 1);

        this.mensalidadeService.criar({
          usuarioId: usuario.id,
          formaPagamento: null,
          pago: null,
          vencimento: nextDatePayment,
        });
      } else {
        if (!financialControl.pago) {
          const differenceInDays = Math.ceil(
            (today.getTime() - financialControl.vencimento.getTime()) /
              (1000 * 3600 * 24),
          );
          if (differenceInDays == 10) {
            throw new UnauthorizedException();
          }
        }

        // const nextMonthPayment = new Date(financialControl.datePayment);
        // nextMonthPayment.setMonth(nextMonthPayment.getMonth() + 1);

        // const differenceInDays = Math.ceil(
        //   (today.getTime() - nextMonthPayment.getTime()) / (1000 * 3600 * 24),
        // );

        // if (differenceInDays >= -10) {
        //   const hasNextMonthPayment = user.financialControl.find(
        //     (x) =>
        //       x.datePayment.getMonth() == nextMonthPayment.getMonth() &&
        //       x.datePayment.getFullYear() == nextMonthPayment.getFullYear() &&
        //       x.userId == user.id,
        //   );
        //   if (!hasNextMonthPayment) {
        //     this.financialControlService.create({
        //       userId: user.id,
        //       formPayment: null,
        //       hasPay: null,
        //       datePayment: nextMonthPayment,
        //     });
        //   }
        // }
      }
    }

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      sub: usuario.id,
      perfilId: usuario.perfilId,
      perfil: usuario.perfil.nome,
      usuarioId: usuario.usuarioId,
      planoId: usuario.planoId,
      ultimoAcesso: usuario.ultimoAcesso,
    };

    this.usuarioService.atualizarUltimoAcesso(usuario.id);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
