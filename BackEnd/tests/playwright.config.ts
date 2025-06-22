import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://gympoisonapp.local/api/', // Certifique-se de usar HTTPS
    ignoreHTTPSErrors: true, // Ignorar erros de SSL
    trace: 'on-first-retry',
  },
});