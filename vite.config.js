import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./ssl-cert/key.pem'),
      cert: fs.readFileSync('./ssl-cert/cert.pem'),
    },
    host: true, // This exposes the server to your network
    port: 5173, // Optional: specify a port
  },
});
