import { UsuarioDto } from '../../usuario/dto/usuario.dto';
import { DebitoProporcionalUsuario } from 'src/database/entities/debito-proporcioal-usuario';

export class DebitoProporcionalUsuarioDto {
  id: number;


  static listar(
    data: DebitoProporcionalUsuario,
  ): DebitoProporcionalUsuarioDto {
    const dto = new DebitoProporcionalUsuarioDto();

    dto.id = data.id;

    return dto;
  }
}
