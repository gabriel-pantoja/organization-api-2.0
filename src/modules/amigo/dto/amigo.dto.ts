import { Usuario } from 'src/database/entities/usuario.entity';

export class AmigoDto {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  criadoEm: Date;

  static listarDto(data: Usuario): AmigoDto {
    const dto = new AmigoDto();

    if (data) {
      dto.id = data.id;
      dto.nome = data.nome;
      dto.sobrenome = data.sobrenome;
      dto.email = data.email;
    }

    return dto;
  }
}
