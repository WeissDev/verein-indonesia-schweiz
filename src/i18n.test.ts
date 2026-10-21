import { test } from 'node:test';
import assert from 'node:assert/strict';
import { switchPath, localePath, localized } from './i18n.ts';

test('language switch maps each page to its counterpart', () => {
  assert.equal(switchPath('/', 'id'), '/id/');
  assert.equal(switchPath('/id/', 'de'), '/');
  assert.equal(switchPath('/events/2025/winterbasar/', 'id'), '/id/events/2025/winterbasar/');
  assert.equal(switchPath('/id/events/2025/winterbasar/', 'de'), '/events/2025/winterbasar/');
  assert.equal(switchPath('/id/ueber-uns/', 'id'), '/id/ueber-uns/');
  assert.equal(localePath('de', '/events/'), '/events/');
});

test('Indonesian falls back to German per field', () => {
  const data = { title: 'Winterbasar', summary: 'Deutsch', indonesia: { title: 'Bazar Musim Dingin', summary: '' } };
  assert.deepEqual(
    [localized(data, 'id').title, localized(data, 'id').summary, localized(data, 'de').title],
    ['Bazar Musim Dingin', 'Deutsch', 'Winterbasar'],
  );
});
