import { test, expect } from '@playwright/test';

let generatedEmail: string;

test.describe('Login', () => {
  const generateUserData = () => ({
    name: 'João Teste',
    email: `joao${Date.now()}@teste.com`,
    password: 'Senha@123',
    endereco: 'Rua Exemplo, 123',
    cpf: '12345678901',
    cep: '12345678',
  });

  // Teste 1: Criação de um novo usuário com sucesso
  test('should create a new user successfully', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local/api/',
      ignoreHTTPSErrors: true,
    });

    const userData = generateUserData();
    generatedEmail = userData.email; // Armazena o email gerado
    const response = await context.post('/api/users', { data: userData });
    expect(response.status()).toBe(201);
  });

  // Teste 2: Login bem-sucedido e retorno de um token
  test('should log in successfully and return a token', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local/api/',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/login', {
      data: { email: "lucaskojimaeda@gmail.com", password: 'nAOFALO1@' },
    });

    console.log("Response status:", response.status());
    console.log("Response body:", await response.text());

    expect(response.status()).toBe(200); // Espera status 200
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json'); // Verifica se a resposta é JSON
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  // Teste 3: Falha ao fazer login com senha incorreta
  test('should fail to log in with incorrect password', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local/api/',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/login', {
      data: { email: "lucaskojimaeda@gmail.com", password: 'SenhaErrada123!' },
    });

    expect(response.status()).toBe(401); // Espera status 401
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json'); // Verifica se a resposta é JSON
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Invalid password.');
  });

  // Teste 4: Falha ao fazer login com email inexistente
  test('should fail to log in with non-existent email', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local/api/',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/login', {
      data: { email: 'emailinexistente@teste.com', password: 'Senha@123' },
    });

    expect(response.status()).toBe(404); // Espera status 404
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json'); // Verifica se a resposta é JSON
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Usuário não encontrado.');
  });
});