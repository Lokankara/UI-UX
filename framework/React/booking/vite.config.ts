import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/booker': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/booker/, ''),
        secure: false,
      }
    }
  }
});
