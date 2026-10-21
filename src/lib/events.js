// Dates are date-only (UTC midnight), so compare as YYYY-MM-DD strings.
const day = (d) => d.toISOString().slice(0, 10);

/** Split events into upcoming (soonest first) and past (newest first); drafts are hidden. */
export function splitEvents(events, today = day(new Date())) {
  const visible = events.filter((e) => !e.data.draft);
  const lastDay = (e) => day(e.data.endDate ?? e.data.eventDate);
  return {
    upcoming: visible.filter((e) => lastDay(e) >= today).sort((a, b) => a.data.eventDate - b.data.eventDate),
    past: visible.filter((e) => lastDay(e) < today).sort((a, b) => b.data.eventDate - a.data.eventDate),
  };
}

const LOCALE = { de: 'de-CH', id: 'id-ID' };
const fmt = (lang) => new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatEventDate({ eventDate, endDate }, lang = 'de') {
  const f = fmt(lang);
  return endDate ? `${f.format(eventDate)} – ${f.format(endDate)}` : f.format(eventDate);
}
