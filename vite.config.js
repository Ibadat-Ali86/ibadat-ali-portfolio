import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2022'
  }
});
