import rss from '@astrojs/rss';
import { siteMeta } from '@lib/constants';
import { getCollection } from 'astro:content';

const { siteTitle, siteDesc } = siteMeta;

export async function get(context) {
  const blog = await getCollection('blog');
  return rss({
    title: siteTitle,
    description: siteDesc,
    site: context.site,
    items: blog.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}`
    }))
  });
}
