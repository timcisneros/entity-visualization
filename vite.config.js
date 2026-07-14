import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react({ include: /\.[jt]sx?$/ })],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.js$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return undefined;
                    if (id.includes('react-flow') || id.includes('dagre')) {
                        return 'graph';
                    }
                    if (id.includes('chart.js')) return 'charts';
                    if (id.includes('amazon-cognito')) return 'auth';
                    return 'vendor';
                },
            },
        },
    },
});
