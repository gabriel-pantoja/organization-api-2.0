import { DebitoPost } from 'src/modules/debito/request/debito.post';
import { DebitoAtrasadoPost } from 'src/modules/notificar/request/debito-atrasado.post';
import { PrazoLimitePost } from 'src/modules/notificar/request/prazo-limite.post';

export class TemplateEmailHelper {
  static DebitoAtrasado(body: DebitoAtrasadoPost): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Debito Atrasado</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .card {
          background-color: #3498db;
          color: #fff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Debito Atrasado</h1>
        <p>Prezado Cliente,</p>
        <p>Esperamos que este e-mail o encontre bem. Identificamos que existe um débito vinculado a voce que passou do prazo</p>
    
        <div class="card">
          <p><strong>${body.debito}</strong></p>
          <p><strong>Detalhes do Débito:</strong></p>
          <ul>
            <li><strong>Responsável:</strong> ${body.responsavel}</li>
            <li><strong>Valor:</strong> R$ ${body.valor}</li>
            <li><strong>Data de Vencimento:</strong> ${body.vencimento}</li>
          </ul>
        </div>
    
        <p>Por favor, efetue o pagamento o mais breve possível. Se você já efetuou o pagamento, por favor, entre no sistema e atualize para debito pago</p>
    
        <p>Agradecemos a sua atenção.</p>
        <p>Atenciosamente,</p>
        <p>Organization</p>
      </div>
    </body>
    
    </html>`;
  }

  static VinculadoNovoDebito(data: DebitoPost): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Debito Atrasado</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .card {
          background-color: #3498db;
          color: #fff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Novo Débito Vinculado</h1>
        <p>Prezado Cliente,</p>
        <p>Esperamos que este e-mail o encontre bem. Identificamos que existe um novo débito vinculado a você</p>
    
        <div class="card">
          <p><strong>${data.nome}</strong></p>
          <p><strong>Detalhes do Débito:</strong></p>
          <ul>
            <li><strong>Responsável:</strong> ${data.responsavelNome}</li>
            <li><strong>Valor:</strong> R$ ${data.valor}</li>
            <li><strong>Data de Vencimento:</strong> ${data.vencimento}</li>
          </ul>
        </div>
    
        <p>Por favor, efetue o pagamento o mais breve possível. Se você já efetuou o pagamento, por favor, entre no sistema e atualize para debito pago</p>
    
        <p>Agradecemos a sua atenção.</p>
        <p>Atenciosamente,</p>
        <p>Organization</p>
      </div>
    </body>
    
    </html>`;
  }

  static PrazoLimite(data: PrazoLimitePost): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Debito Atrasado</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .card {
          background-color: #3498db;
          color: #fff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Novo Débito Vinculado</h1>
        <p>Prezado Cliente,</p>
        <p>Esperamos que este e-mail o encontre bem. Identificamos que existe um débito vinculado a voce que vencê hoje</p>
    
        <div class="card">
          <p><strong>${data.debito}</strong></p>
          <p><strong>Detalhes do Débito:</strong></p>
          <ul>
            <li><strong>Responsável:</strong> ${data.responsavel}</li>
            <li><strong>Valor:</strong> R$ ${data.valor}</li>
            <li><strong>Data de Vencimento:</strong> ${data.vencimento}</li>
          </ul>
        </div>
    
        <p>Por favor, efetue o pagamento o mais breve possível. Se você já efetuou o pagamento, por favor, entre no sistema e atualize para debito pago</p>
    
        <p>Agradecemos a sua atenção.</p>
        <p>Atenciosamente,</p>
        <p>Organization</p>
      </div>
    </body>
    
    </html>`;
  }

  static Lembrete(): string {
    return '<h3 style="color: red">Identificamos que existe um débito vinculado a voce que vence daqui a 3 dias</h3>';
  }
}
