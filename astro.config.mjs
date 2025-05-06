import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, sharpImageService } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import { siteMeta } from './src/lib/constants';
const { siteUrl } = siteMeta;

// eslint-disable-next-line no-undef
const env = loadEnv('production', process.cwd());

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  prefetch: true,
  integrations: [sitemap(), react(), icon()],
  adapter: node({
    mode: 'standalone'
  }),
  image: {
    service: sharpImageService()
  },
  vite: {
    plugins: [
      tailwindcss(),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: 'personal-a0p',
        project: 'def90eth',
        // Specify the directory containing build artifacts
        sourcemaps: {
          assets: './dist/**'
        },
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: env.SENTRY_AUTH_TOKEN

        // Optionally uncomment the line below to override automatic release name detection
        // release: {
        //   name: env.RELEASE
        // }
      })
    ],

    build: {
      sourcemap: true
    }
  }
});
