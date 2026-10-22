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
    },
    {
      name: 'demo-route-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          const [pathname, search] = url.split('?');
          const query = search ? '?' + search : '';
          
          if (pathname === '/demo') {
            req.url = '/demo/' + query;
          }
          next();
        });
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
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        demo: path.resolve(__dirname, 'demo/index.html')
      }
    }
  }
});
