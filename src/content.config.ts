import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Field names must match .pages.yml (the editor writes these files).
// The editor saves empty fields as "", which would fail date/image parsing.
const optional = <T extends z.ZodTypeAny>(schema: T) => z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      eventDate: z.coerce.date(),
      endDate: optional(z.coerce.date()),
      time: z.string().optional(),
      location: z.string().optional(),
      image: optional(image()),
      summary: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      image: optional(image()),
    }),
});

export const collections = { events, pages };
