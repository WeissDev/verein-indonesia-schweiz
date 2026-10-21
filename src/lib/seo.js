// schema.org structured data (JSON-LD) for Google rich results.
export const ORG = {
  '@type': 'NGO',
  name: 'Verein Indonesia Schweiz',
  url: 'https://vereinindonesiaschweiz.ch',
  logo: 'https://vereinindonesiaschweiz.ch/images/logos/Logo-Verein-Indonesia-Schweiz.png',
  sameAs: ['https://www.facebook.com/groups/94359495038', 'https://www.instagram.com/vis20225/'],
};

export const orgJsonLd = (description) => ({ '@context': 'https://schema.org', ...ORG, description, areaServed: 'CH' });

const day = (d) => d.toISOString().slice(0, 10);

// Swiss UTC offset on that date, e.g. "+02:00" in summer, "+01:00" in winter
const zurichOffset = (date) =>
  new Intl.DateTimeFormat('en', { timeZone: 'Europe/Zurich', timeZoneName: 'longOffset' })
    .formatToParts(date)
    .find((p) => p.type === 'timeZoneName')
    .value.replace('GMT', '');

const at = (date, hm) => (hm ? `${day(date)}T${hm[0].padStart(2, '0')}:${hm[1]}:00${zurichOffset(date)}` : day(date));

export function eventJsonLd(data, { url, image }) {
  // time is free text like "12:30 – 22:00"; if it doesn't parse, fall back to date only
  const t = data.time?.match(/(\d{1,2})[:.](\d{2})(?:\s*[–-]\s*(\d{1,2})[:.](\d{2}))?/);
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title,
    description: data.summary,
    url,
    image: image ? [image] : undefined,
    startDate: at(data.eventDate, t && [t[1], t[2]]),
    endDate: at(data.endDate ?? data.eventDate, t?.[3] && [t[3], t[4]]),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: data.location && { '@type': 'Place', name: data.location.split(',')[0].trim(), address: data.location },
    organizer: { '@type': ORG['@type'], name: ORG.name, url: ORG.url },
  };
}
