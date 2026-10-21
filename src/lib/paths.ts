import { getCollection } from 'astro:content';

// Shared getStaticPaths for the German and Indonesian routes
export const eventPaths = async () =>
  (await getCollection('events', (e) => !e.data.draft)).map((event) => ({ params: { slug: event.id }, props: { event } }));

// "home" is rendered by the index routes
export const pagePaths = async () =>
  (await getCollection('pages', (p) => p.id !== 'home')).map((page) => ({ params: { slug: page.id }, props: { page } }));
