export class TemplateEmailHelper {
  static NaoPago(): string {
    return '<h3 style="color: red">Identificamos que existe um débito vinculado a voce que passou do prazo</h3>';
  }

  static NoPrazoLimite(): string {
    return '<h3 style="color: red">Identificamos que existe um débito vinculado a voce que vence hoje</h3>';
  }

  static Lembrete(): string {
    return '<h3 style="color: red">Identificamos que existe um débito vinculado a voce que vence daqui a 3 dias</h3>';
  }

  static NovoDebito(): string {
    return '<h3 style="color: red">Identificamos que acaba sendo vinculado a um novo débito</h3>';
  }
}
