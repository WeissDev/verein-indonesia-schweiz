// Instagram posts via a Behold.so JSON feed (behold.so handles Instagram's expiring tokens).
// Fetched at build time only; the nightly rebuild keeps it fresh.
export const IG_PROFILE = 'https://www.instagram.com/vis20225/';
export const IG_HANDLE = '@vis20225';

// A still image for the grid; for VIDEO posts mediaUrl is the video itself
export const postImage = (p) => p.sizes?.medium?.mediaUrl ?? p.thumbnailUrl ?? (p.mediaType !== 'VIDEO' ? p.mediaUrl : undefined);

export async function fetchInstagram(feedUrl, fetchImpl = fetch) {
  if (!feedUrl) return [];
  try {
    const res = await fetchImpl(feedUrl, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { posts = [] } = await res.json();
    return posts
      .map((p) => ({ id: p.id, url: p.permalink, image: postImage(p), alt: p.altText || p.prunedCaption || '' }))
      .filter((p) => p.url && p.image);
  } catch (e) {
    // Never fail the site build because of Instagram; the section falls back to the follow link
    console.warn(`[instagram] feed unavailable: ${e.message}`);
    return [];
  }
}

let cached;
/** One fetch per build, shared by the German and Indonesian homepages. */
export const getInstagram = () => (cached ??= fetchInstagram(import.meta.env?.BEHOLD_FEED_URL));
