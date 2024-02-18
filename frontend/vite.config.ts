/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: true,
    port: 8888,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/config/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/components/ui/**/*.{ts,tsx}',
        'src/vite-env.d.ts',
        'src/**/interface.ts',
        'src/types/*',
        'src/main.tsx',
      ],
    }
  }
})
