import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://gympoisonapp.local/api/', 
    ignoreHTTPSErrors: true, 
    trace: 'on-first-retry',
  },
});