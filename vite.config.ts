import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';
import express from 'express';
import healthHandler from './api/health.js';
import submitHandler from './api/contact/submit.js';

// Load environment variables for local development
dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          const apiApp = express();
          apiApp.use(express.json());
          apiApp.use(express.urlencoded({ extended: true }));

          // Bind endpoints locally
          apiApp.get('/api/health', (req, res) => {
            return healthHandler(req as any, res as any);
          });
          apiApp.post('/api/contact/submit', (req, res) => {
            return submitHandler(req as any, res as any);
          });

          // Mount express as a middleware in Vite
          server.middlewares.use(apiApp);
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
