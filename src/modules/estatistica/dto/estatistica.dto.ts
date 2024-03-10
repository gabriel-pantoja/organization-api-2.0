import { VinculoCompraProduto } from 'src/database/entities/vinculo-compra-produto.entity';
import * as moment from 'moment';

export class EstatisticaDto {
  id: number;
  produtoId: number;
  preco: number;
  criadoEm: string;

  static listaPrecoPorIdProduto(data: VinculoCompraProduto): EstatisticaDto {
    const dto = new EstatisticaDto();

    dto.id = data.id;
    dto.produtoId = data.produtoId;
    dto.preco = data.preco;
    dto.criadoEm = moment(data.criadoEm).format('DD/MM/YYYY HH:mm:ss');

    return dto;
  }
}
