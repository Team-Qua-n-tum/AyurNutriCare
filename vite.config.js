import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const pkg = id.toString().split('node_modules/')[1].split('/')[0];
            // Exclude empty chunks for these packages
            if (['react-router-dom', 'set-cookie-parser'].includes(pkg)) return;
            return pkg;
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // increases warning threshold to 1000 kB
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
