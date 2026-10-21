import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/** Absolute URL of a 1200px JPEG for link previews and structured data. */
export async function shareImageUrl(image: ImageMetadata | undefined, site: URL) {
  if (!image) return new URL('/images/logos/Logo-Verein-Indonesia-Schweiz.png', site).href;
  return new URL((await getImage({ src: image, width: 1200, format: 'jpg' })).src, site).href;
}
