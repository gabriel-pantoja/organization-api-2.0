export class IDebitoAtrasado {
  email: string;
  debito: string;
  responsavel: string;
  valor: number;
  vencimento: Date;
  referenteMesAno: string;
}

export class IDebitoVenceHoje {
  email: string;
  debito: string;
  responsavel: string;
  valor: number;
  vencimento: Date;
  referenteMesAno: string;
}

export class IDebitoTresDiasAntesVencer {
  email: string;
  debito: string;
  responsavel: string;
  valor: number;
  vencimento: Date;
  referenteMesAno: string;
}

export class IConvidarAmigo {
  nome: string;
  email: string;
  url: string;
}

export class INovaSenha {
  nome: string;
  email: string;
  url: string;
}
