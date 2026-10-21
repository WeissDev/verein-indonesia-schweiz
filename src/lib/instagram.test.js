import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchInstagram } from './instagram.js';

const reply = (body, ok = true) => async () => ({ ok, status: ok ? 200 : 500, json: async () => body });

test('maps posts and picks a still image, never a video file', async () => {
  const posts = await fetchInstagram(
    'https://feeds.behold.so/x',
    reply({
      posts: [
        { id: '1', permalink: 'https://ig/p/1', mediaType: 'IMAGE', mediaUrl: 'big.jpg', sizes: { medium: { mediaUrl: 'm.webp' } }, altText: 'Tanz' },
        { id: '2', permalink: 'https://ig/p/2', mediaType: 'VIDEO', mediaUrl: 'clip.mp4', thumbnailUrl: 'thumb.jpg', prunedCaption: 'Reel' },
        { id: '3', permalink: 'https://ig/p/3', mediaType: 'VIDEO', mediaUrl: 'clip.mp4' },
      ],
    }),
  );
  assert.deepEqual(posts, [
    { id: '1', url: 'https://ig/p/1', image: 'm.webp', alt: 'Tanz' },
    { id: '2', url: 'https://ig/p/2', image: 'thumb.jpg', alt: 'Reel' },
  ]);
});

test('missing config or a failing feed yields no posts instead of breaking the build', async () => {
  assert.deepEqual(await fetchInstagram(undefined), []);
  assert.deepEqual(await fetchInstagram('https://feeds.behold.so/x', reply({}, false)), []);
  assert.deepEqual(await fetchInstagram('https://feeds.behold.so/x', async () => { throw new Error('offline'); }), []);
});
