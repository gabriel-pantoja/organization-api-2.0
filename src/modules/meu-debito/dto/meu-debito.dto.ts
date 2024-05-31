import { MeuDebito } from 'src/database/entities/meu-debito.entity';

export class MeuDebitoDto {
  id: number;
  categoriaId: number;
  categoriaNome: string;
  nome: string;
  valor: number;
  vencimento: Date;
  pago: boolean;
  referenteMesAno: string;
  juros: boolean;
  valorJuros: number;
  formaPagamentoId: number;
  formaPagamentoNome: string;
  cartaoId?: number;
  cartaoNome?: string;
  dataPagamento: Date;

  static listar(data: MeuDebito): MeuDebitoDto {
    const dto = new MeuDebitoDto();

    dto.id = data.id;
    dto.categoriaId = data.categoriaId;
    dto.categoriaNome = data.categoria.nome;
    dto.nome = data.nome;
    dto.valor = data.valor;
    dto.vencimento = data.vencimento;
    dto.pago = data.pago;
    dto.referenteMesAno = data.referenteMesAno;
    dto.juros = data.juros;
    dto.valorJuros = data.valorJuros;
    dto.formaPagamentoId = data.formaPagamentoId;
    dto.formaPagamentoNome = data.formaPagamento.nome;
    dto.cartaoId = data.cartaoId;
    dto.cartaoNome = data.cartao?.nome;
    dto.dataPagamento = data.dataPagamento;

    return dto;
  }
}
