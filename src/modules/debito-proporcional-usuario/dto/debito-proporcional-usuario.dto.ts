import { DebitoProporcionalUsuario } from 'src/database/entities/debito-proporcioal-usuario';

export class DebitoProporcionalUsuarioDto {
  id: number;
  nome: string;
  sobrenome: string;
  salario: number;

  static get(data: DebitoProporcionalUsuario): DebitoProporcionalUsuarioDto {
    const dto = new DebitoProporcionalUsuarioDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.sobrenome = data.sobrenome;
    dto.salario = data.salario;

    return dto;
  }
}
