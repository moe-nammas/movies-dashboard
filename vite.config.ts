import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@data': path.resolve(__dirname, './src/data'),
      '@reducers': path.resolve(__dirname, './src/reducers'),
    },
  },
});
