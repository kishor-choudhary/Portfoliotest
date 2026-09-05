import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  // On GitHub Pages the site is served from https://<user>.github.io/<repo>/,
  // so assets must be prefixed with the repo name. Locally we serve from root.
  const repoBase = process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/';

  return {
    base: command === 'build' ? repoBase : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Allow the Arena.ai live-preview host to reach the dev server.
      allowedHosts: ['3000-ijkozdetaji6z8shxjnuw.e2b.app', '.e2b.app'],
    },
  };
});
