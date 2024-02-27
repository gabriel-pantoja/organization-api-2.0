import { MeuDebito } from 'src/database/entities/meu-debito.entity';

export class MeuDebitoDto {
  id: number;
  nome: string;
  valor: number;
  vencimento: Date;
  pago: boolean;
  referenteMesAno: string;
  juros: boolean;
  valorJuros: number;
  localPagamento: string;
  dataPagamento: Date;

  static listar(data: MeuDebito): MeuDebitoDto {
    const dto = new MeuDebitoDto();

    dto.id = data.id;
    dto.nome = data.nome;
    dto.valor = data.valor;
    dto.vencimento = data.vencimento;
    dto.pago = data.pago;
    dto.referenteMesAno = data.referenteMesAno;
    dto.juros = data.juros;
    dto.valorJuros = data.valorJuros;
    dto.localPagamento = data.localPagamento;
    dto.dataPagamento = data.dataPagamento;

    return dto;
  }
}
