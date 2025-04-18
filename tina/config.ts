import { defineConfig } from 'tinacms';
import { categories } from '../src/lib/constants';

const tinacmsCategories = categories.map((category) => {
  return { label: category.categoryName, value: category.categorySlug };
});

// Your hosting provider likely exposes this as an environment variable
// eslint-disable-next-line no-undef
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  // eslint-disable-next-line no-undef
  clientId: process.env.CLIENTID, // Get this from tina.io
  // eslint-disable-next-line no-undef
  token: process.env.TOKEN, // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public'
    }
  },

  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog記事',
        path: 'src/content/blog',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.slug}`;
            }
          }
        },
        defaultItem: () => {
          return {
            pubDate: new Date().toISOString()
          };
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'タイトル',
            ui: {
              validate: (value) => {
                if (value?.length < 1) {
                  return 'Title require!';
                }
                if (value?.length > 40) {
                  return 'Title cannot be more than 40 characters long';
                }
              }
            },
            isTitle: true,
            required: true
          },
          {
            type: 'string',
            name: 'slug',
            label: 'スラッグ',
            ui: {
              validate: (value) => {
                if (value?.length < 1) {
                  return 'Slug require!';
                }
                if (value?.length > 40) {
                  return 'Slug cannot be more than 40 characters long';
                }
              }
            },
            required: true
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: '投稿日',
            ui: {
              component: 'date',
              dateFormat: 'YYYY-MM-DD',
              parse: (value) => value && value.format('YYYY-MM-DD')
            },
            required: true
          },
          {
            type: 'image',
            name: 'image',
            label: '画像'
          },
          {
            type: 'string',
            name: 'category',
            label: 'カテゴリー',
            list: true,
            options: tinacmsCategories
          },
          {
            type: 'rich-text',
            name: 'body',
            label: '記事本文',
            ui: {
              validate: (value) => {
                if (value?.length < 1) {
                  return 'body require!';
                }
              }
            },
            isBody: true,
            required: true
          },
          {
            type: 'string',
            name: 'description',
            label: '説明',
            ui: {
              component: 'textarea',
              validate: (value) => {
                if (value?.length === 0) {
                  return 'description require!';
                }
              }
            },
            required: true
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            required: true,
            description: 'If this is checked the post will not be published'
          }
        ]
      }
    ]
  }
});
