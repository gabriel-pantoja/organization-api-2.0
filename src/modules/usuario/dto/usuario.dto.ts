import { Usuario } from 'src/database/entities/usuario.entity';

export class UsuarioDto {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  salario: number;
  criadoEm: Date;

  static listarDto(data: Usuario): UsuarioDto {
    const dto = new UsuarioDto();

    if (data) {
      dto.id = data.id;
      dto.nome = data.nome;
      dto.sobrenome = data.sobrenome;
      dto.email = data.email;
      dto.salario = data.salario;
    }

    return dto;
  }
}
