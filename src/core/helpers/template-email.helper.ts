import { DebitoCompartilhadoPost } from 'src/modules/debito-compartilhado/request/debito-compartilhado.post';
import {
  IConvidarAmigo,
  IDebitoAtrasado,
  IDebitoTresDiasAntesVencer,
  IDebitoVenceHoje,
  IEsqueceuSenha,
  INovaSenha,
} from '../interfaces/email.interface';

export class TemplateEmailHelper {
  static EsqueceuSenha(body: IEsqueceuSenha): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Criação de Senha</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
        }
    
        .cta-button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Esqueceu a senha</h2>
        <p>Olá ${body.nome},</p>
        <p>Recebemos uma solicitação para recuperar a senha da sua conta. Se você não fez essa solicitação, por favor, ignore este e-mail.</p>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <a href="${body.url}" class="cta-button">Redefinir Senha</a>
        <p>O link expirará em 24 horas.</p>
        <p>Se precisar de alguma assistência, não hesite em entrar em contato conosco.</p>
        <p>Obrigado!</p>
        <p>Atenciosamente,<br>Equipe da Organization</p>
      </div>
    </body>
    </html>
    `;
  }

  static NovaSenha(body: INovaSenha): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Criação de Senha</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
        }
    
        .cta-button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Bem-vindo ao Organization</h2>
        <p>Olá ${body.nome},</p>
        <p>Obrigado por se cadastrar no nosso sistema! Para garantir a segurança da sua conta, precisamos que você crie uma senha. Clique no botão abaixo para definir sua senha agora:</p>
        <a href="${body.url}" class="cta-button">Criar Senha</a>
        <p>Se precisar de alguma assistência, não hesite em entrar em contato conosco.</p>
        <p>Obrigado!</p>
        <p>Atenciosamente,<br>Equipe da Organization</p>
      </div>
    </body>
    </html>
    `;
  }

  static ConvidarAmigo(body: IConvidarAmigo): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Convite para Cadastro</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #333;
        }
    
        p {
          color: #555;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
        }
    
        .cta-button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Convite para se Cadastrar</h2>
        <p>Olá ${body.nome},</p>
        <p>Você foi convidado a se juntar à nossa comunidade! Aproveite os benefícios do nosso sistema ao compartilhar experiências incríveis e manter-se atualizado.</p>
        <p>Clique no botão abaixo para começar a se cadastrar:</p>
        <a href="${body.url}" class="cta-button">Cadastrar Agora</a>
        <p>Esperamos vê-lo em breve!</p>
        <p>Atenciosamente,/p>
        <p>Organization</p>
      </div>
    </body>
    </html>
    `;
  }

  static Lembrete(): string {
    return '<h3 style="color: red">Ola</h3>';
  }

  static DebitoAtrasado(body: IDebitoAtrasado): string {
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

  static VinculadoNovoDebito(data: DebitoCompartilhadoPost): string {
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
    
        <p>Não se esqueça de pagar antes do vencimento</p>
    
        <p>Agradecemos a sua atenção.</p>
        <p>Atenciosamente,</p>
        <p>Organization</p>
      </div>
    </body>
    
    </html>`;
  }

  static DebitoVenceHoje(data: IDebitoVenceHoje): string {
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

  static DebitoTresDiasAntesVencer(data: IDebitoTresDiasAntesVencer): string {
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
        <p>Esperamos que este e-mail o encontre bem. Identificamos que existe um débito vinculado a voce que vence daqui a 3 dias</p>
    
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
}
