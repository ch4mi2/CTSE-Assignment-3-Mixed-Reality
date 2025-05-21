import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'ssl-cert/key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'ssl-cert/cert.pem')),
    // },
    host: true,
    port: 5173,
    allowedHosts: true,
  },
});
