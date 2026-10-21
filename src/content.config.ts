import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Field names must match .pages.yml (the editor writes these files).
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    eventDate: z.coerce.date(),
    // the editor saves an empty date as ""
    endDate: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.coerce.date().optional()),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { events, pages };
