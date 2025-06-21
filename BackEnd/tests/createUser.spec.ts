import { test, expect } from '@playwright/test';

test.describe('User Creation', () => {
  const userData = {
    name: 'João Teste',
    email: 'joao@teste.com',
    password: 'Senha@123',
    endereco: 'Rua Exemplo, 123',
    cpf: '12345678901',
    cep: '12345678',
  };

  test('should create a new user successfully', async ({ request }) => {
    const response = await request.post('/users', { data: userData });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.email).toBe(userData.email);
  });

  test('should fail to create a user with duplicate email', async ({ request }) => {
    const response = await request.post('/users', { data: userData });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'E-mail já cadastrado.');
  });
});