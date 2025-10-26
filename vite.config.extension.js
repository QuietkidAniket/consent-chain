import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'extension/dist'), // Output to extension/dist
    emptyOutDir: true, // Clear the directory before building
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'extension/popup.js'),
        background: resolve(__dirname, 'extension/background.js'),
        // We don't bundle content.js as it's simple
      },
      output: {
        entryFileNames: '[name].js', // Keep original names
      },
    },
  },
});