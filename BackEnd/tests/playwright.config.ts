import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://gympoisonapp.local/', // Replace with your backend URL
    trace: 'on-first-retry',
  },
});