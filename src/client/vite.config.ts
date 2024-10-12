import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment";

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000';
const CLIENT_ENV = {
  BRAND_NAME: process.env.BRAND_NAME || 'Client',
  ALLOW_ADD_WITH_GEN_AI: process.env.ALLOW_ADD_WITH_GEN_AI || 'False'
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(CLIENT_ENV)
  ],
  build: {
    assetsDir: 'static'
  },
  define: {
    "global": {},  // for use-dark-mode
  },
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
      }
    }
  },
})
