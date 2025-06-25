import { test, expect } from '@playwright/test';

let generatedEmail: string;
let generatedPassword: string = 'Senha@123';

test.describe('Login', () => {
  const generateUserData = () => ({
    name: 'João Teste',
    email: `joao${Date.now()}@teste.com`,
    password: generatedPassword,
    endereco: 'Rua Exemplo, 123',
    cpf: '12345678901',
    cep: '12345678',
  });


  test('should create a new user successfully', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local/api/',
      ignoreHTTPSErrors: true,
    });

    const userData = generateUserData();
    generatedEmail = userData.email;
    const response = await context.post('users', { data: userData });
    expect(response.status()).toBe(201);
  });

  test('should log in successfully and return a token', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/api/login', {
      data: { 
        email: generatedEmail, 
        password: generatedPassword 
      },
    });

    console.log("Response status:", response.status());
    console.log("Response body:", await response.text());

    expect(response.status()).toBe(200); 
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });


  test('should fail to log in with incorrect password', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/api/login', {
      data: { 
        email: generatedEmail, 
        password: 'SenhaErrada123!' 
      },
    });

    expect(response.status()).toBe(401); 
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json'); 
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Invalid password.');
  });

  test('should fail to log in with non-existent email', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://gympoisonapp.local',
      ignoreHTTPSErrors: true,
    });

    const response = await context.post('/api/login', {
      data: { email: 'emailinexistente@teste.com', password: 'Senha@123' },
    });

    expect(response.status()).toBe(404); 
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json'); 
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'User not found.');
  });
});