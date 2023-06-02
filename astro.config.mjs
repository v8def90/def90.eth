import image from "@astrojs/image";
import markdoc from '@astrojs/markdoc';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { siteMeta } from './src/lib/constants';
const {
  siteUrl
} = siteMeta;

// eslint-disable-next-line no-undef
const env = loadEnv("production", process.cwd());


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), prefetch(), sitemap(), tailwind(), react(), markdoc()],
  // output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    plugins: [
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      org: "personal-a0p",
      project: "def90eth",
      // Specify the directory containing build artifacts
      include: "./dist",
      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and needs the `project:releases` and `org:read` scopes
      authToken: env.SENTRY_AUTH_TOKEN

      // Optionally uncomment the line below to override automatic release name detection
      // release: env.RELEASE,
    })],

    build: {
      sourcemap: true
    }
  }
});