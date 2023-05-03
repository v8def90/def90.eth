import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants'

const { siteUrl } = siteMeta;

// https://astro.build/config
export default defineConfig({
    site: siteUrl
});
