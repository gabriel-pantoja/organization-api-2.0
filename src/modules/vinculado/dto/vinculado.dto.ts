import { Usuario } from 'src/database/entities/usuario.entity';

export class VinculadoDto {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  criadoEm: Date;

  static listarDto(data: Usuario): VinculadoDto {
    const dto = new VinculadoDto();

    if (data) {
      dto.id = data.id;
      dto.nome = data.nome;
      dto.sobrenome = data.sobrenome;
      dto.email = data.email;
    }

    return dto;
  }
}
