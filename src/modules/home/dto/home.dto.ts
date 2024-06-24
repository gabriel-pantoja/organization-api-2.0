import { DebitoCompartilhadoUsuarioDto } from 'src/modules/debito-compartilhado-usuario/dto/debito-compartilhado-usuario.dto';
import { MeuDebitoDto } from 'src/modules/meu-debito/dto/meu-debito.dto';

export class HomeDto {
  debitoCompartilhadoUsuario: DebitoCompartilhadoUsuarioDto[];
  meuDebito: MeuDebitoDto[];

  static listar(
    debitoCompartilhadoUsuario: DebitoCompartilhadoUsuarioDto[],
    meuDebito: MeuDebitoDto[],
  ): HomeDto {
    const dto = new HomeDto();

    return dto;
  }
}
