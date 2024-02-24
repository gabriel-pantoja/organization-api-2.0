import { Item } from 'src/database/entities/item.entity';

export class ItemDto {
  id: number;
  nome: string;
  marca: string;

  static listar(data: Item): ItemDto {
    const dto = new ItemDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.marca = data.marca;

    return dto;
  }
}
