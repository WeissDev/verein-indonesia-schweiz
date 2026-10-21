import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitEvents } from './events.js';

const ev = (id, eventDate, extra = {}) => ({ id, data: { eventDate: new Date(eventDate), draft: false, ...extra } });

test('splits upcoming and past around today', () => {
  const { upcoming, past } = splitEvents(
    [
      ev('old', '2025-01-01'),
      ev('later', '2026-12-01'),
      ev('today', '2026-10-21'),
      ev('running', '2026-10-20', { endDate: new Date('2026-10-22') }),
      ev('ended', '2026-10-18', { endDate: new Date('2026-10-20') }),
      ev('draft', '2026-11-01', { draft: true }),
    ],
    '2026-10-21',
  );
  assert.deepEqual(upcoming.map((e) => e.id), ['running', 'today', 'later']);
  assert.deepEqual(past.map((e) => e.id), ['ended', 'old']);
});
