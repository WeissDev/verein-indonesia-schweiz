import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventJsonLd } from './seo.js';

const ld = (data) => eventJsonLd({ title: 'X', ...data }, { url: 'https://example.ch/e/' });

test('summer event gets +02:00 start and end times', () => {
  const e = ld({ eventDate: new Date('2026-08-22'), time: '12:30 – 22:00', location: 'Kurbrunnenanlage, 4310 Rheinfelden' });
  assert.equal(e.startDate, '2026-08-22T12:30:00+02:00');
  assert.equal(e.endDate, '2026-08-22T22:00:00+02:00');
  assert.deepEqual(e.location, { '@type': 'Place', name: 'Kurbrunnenanlage', address: 'Kurbrunnenanlage, 4310 Rheinfelden' });
});

test('winter, multi-day, hyphen and dot separators', () => {
  const e = ld({ eventDate: new Date('2025-12-01'), endDate: new Date('2025-12-02'), time: '9.00 - 17.30' });
  assert.equal(e.startDate, '2025-12-01T09:00:00+01:00');
  assert.equal(e.endDate, '2025-12-02T17:30:00+01:00');
});

test('unparseable or missing time falls back to dates', () => {
  assert.equal(ld({ eventDate: new Date('2025-05-11'), time: 'ganzer Tag' }).startDate, '2025-05-11');
  const e = ld({ eventDate: new Date('2025-05-11'), time: '11:30' });
  assert.equal(e.startDate, '2025-05-11T11:30:00+02:00');
  assert.equal(e.endDate, '2025-05-11');
});
