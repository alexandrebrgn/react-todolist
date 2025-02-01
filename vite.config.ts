import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    plugins: [react()],
    build: {
        outDir: 'dist', // Dossier de sortie pour les fichiers de production
        assetsDir: 'assets', // Dossier pour les assets (CSS, images, etc.)
        emptyOutDir: true, // Vide le dossier de sortie avant de construire
    },
});