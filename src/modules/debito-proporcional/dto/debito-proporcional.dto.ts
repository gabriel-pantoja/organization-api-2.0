import { DebitoProporcional } from 'src/database/entities/debito-proporcional';

export class DebitoProporcionalDto {
  id: number;
  categoriaId: number;
  categoriaNome: string;
  tipoDebitoId: number;
  tipoDebitoNome: string;
  nome: string;
  descricao?: string;
  valor: number;
  vencimento: Date;
  pago: boolean;
  referenteMesAno: string;
  juros: boolean;
  valorJuros: number;
  debitoRecorrente: boolean;
  parcelas: number;
  formaPagamentoId: number;
  formaPagamentoNome: string;
  bancoId: number;
  bancoNome: string;
  localPagamentoId: number;
  localPagamentoNome: string;
  dataPagamento: Date;
  pagamento: string;
  debitoParceladoId: number;

  static listar(data: DebitoProporcional): DebitoProporcionalDto {
    const dto = new DebitoProporcionalDto();

    dto.id = data.id;
    dto.categoriaId = data.categoriaId;
    dto.categoriaNome = data.categoria.nome;
    dto.tipoDebitoId = data.tipoDebitoId;
    dto.tipoDebitoNome = data.tipoDebito.nome;
    dto.nome = data.nome;
    dto.descricao = data.descricao;
    dto.valor = data.valor;
    dto.vencimento = data.vencimento;
    dto.pago = data.pago;
    dto.referenteMesAno = data.referenteMesAno;
    dto.juros = data.juros;
    dto.valorJuros = data.valorJuros;
    dto.debitoRecorrente = data.debitoRecorrente;
    dto.parcelas = data.parcelas;
    dto.formaPagamentoId = data.formaPagamentoId;
    dto.formaPagamentoNome = data.formaPagamento?.nome;
    dto.bancoId = data.bancoId;
    dto.bancoNome = data.banco?.nome;
    dto.localPagamentoId = data.localPagamentoId;
    dto.localPagamentoNome = data.localPagamento?.nome;
    dto.dataPagamento = data.dataPagamento;
    dto.pagamento = `${
      data.formaPagamento?.nome != undefined
        ? `${data.formaPagamento?.nome}`
        : ''
    }${
      data.localPagamento?.nome != undefined
        ? ` - ${data.localPagamento?.nome}`
        : ''
    }
    ${data.banco?.nome != undefined ? ` - ${data.banco?.nome}` : ''}`;
    dto.debitoParceladoId = data.debitoParceladoId;

    return dto;
  }

  static selectNome(data: DebitoProporcional): DebitoProporcionalDto {
    const dto = new DebitoProporcionalDto();
    dto.nome = data.nome;
    dto.categoriaId = data.categoriaId;
    dto.tipoDebitoId = data.tipoDebitoId;

    return dto;
  }
}
