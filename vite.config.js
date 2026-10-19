import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'react-refresh-register-fix',
      enforce: 'post',
      transform(code, id) {
        if (id.includes('@react-refresh') || id.includes('refresh-runtime')) {
          if (!code.includes('export { register }')) {
            return code + '\nexport { register };\n';
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  server: {
    port: 5173,
    host: true
  }
});
