import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://gympoisonapp.local/',
    ignoreHTTPSErrors: true, // Ignorar erros de SSL
    trace: 'on-first-retry',
  },
});