import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('Login', () => {
  const loginData = {
    email: 'joao@teste.com',
    password: 'Senha@123',
  };

  test('should log in successfully and return a token', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://gympoisonapp.local/api/login', { data: loginData });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  test('should fail to log in with incorrect password', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://gympoisonapp.local/api/login', { // Use URL absoluta
      data: { email: loginData.email, password: 'SenhaErrada123!' },
    });
    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Invalid password.');
  });

  test('should fail to log in with non-existent email', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.post('https://gympoisonapp.local/api/login', { // Use URL completa
      data: { email: 'emailinexistente@teste.com', password: 'Senha@123' },
    });
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error', 'Usuário não encontrado.');
  });
});