import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(projectRootDir, 'src'),
      '@views': path.resolve(projectRootDir, 'src', 'views')
    }
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [vue(), eslintPlugin(), viteCompression()]
});
