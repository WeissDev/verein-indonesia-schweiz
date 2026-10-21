// German is the default (no URL prefix); Indonesian lives under /id/.
export type Lang = 'de' | 'id';
export const LANGS: Lang[] = ['de', 'id'];
export const HTML_LANG = { de: 'de-CH', id: 'id-ID' } as const;
export const OG_LOCALE = { de: 'de_CH', id: 'id_ID' } as const;

const ui = {
  de: {
    'site.description': 'Die Austauschplattform für Indonesier, Schweizer und alle Interessierten',
    'nav.label': 'Hauptnavigation',
    'nav.events': 'Events',
    'nav.about': 'Über uns',
    'nav.member': 'Mitglied werden',
    'lang.label': 'Sprache',
    'home.next': 'Nächster Event',
    'home.details': 'Details & Programm',
    'home.welcome': 'Selamat datang · Willkommen',
    'home.toEvents': 'Events & Rückblick',
    'home.noEvents': 'Zurzeit sind keine Events geplant – neue Anlässe werden hier angekündigt.',
    'home.later': 'Weitere Termine',
    'home.review': 'Rückblick',
    'home.allEvents': 'Alle Events →',
    'cta.title': 'Mitglied werden',
    'cta.text': 'Unterstützen Sie indonesische Kultur in der Schweiz und karitative Projekte in Indonesien.',
    'cta.button': 'Mehr erfahren',
    'events.title': 'Events',
    'events.eyebrow': 'Agenda',
    'events.lead': 'Kultur, Kulinarik und Begegnung – alle Anlässe des Vereins.',
    'events.upcoming': 'Demnächst',
    'events.none': 'Zurzeit sind keine Events geplant. Schauen Sie bald wieder vorbei.',
    'event.eyebrow': 'Event',
    'event.date': 'Datum',
    'event.time': 'Zeit',
    'event.place': 'Ort',
    'event.route': 'Route planen ↗',
    'event.back': '← Alle Events',
    'event.flyer': 'Flyer',
    'team.title': 'Der Vereinsvorstand',
    'footer.contact': 'Kontakt',
    'footer.facebook': 'Facebook-Gruppe',
    'footer.donations': 'Spenden',
    'footer.fees': 'Mitgliederbeiträge',
    'footer.account': 'Kontonummer',
    'email.reveal': 'E-Mail-Adresse anzeigen',
    'ig.follow': 'Folgen Sie uns',
    'ig.post': 'Instagram-Beitrag',
    'notTranslated': '',
  },
  id: {
    'site.description': 'Platform pertukaran bagi orang Indonesia, orang Swiss, dan semua yang tertarik',
    'nav.label': 'Navigasi utama',
    'nav.events': 'Acara',
    'nav.about': 'Tentang Kami',
    'nav.member': 'Jadi Anggota',
    'lang.label': 'Bahasa',
    'home.next': 'Acara Berikutnya',
    'home.details': 'Detail & Program',
    'home.welcome': 'Selamat datang',
    'home.toEvents': 'Acara & Kilas Balik',
    'home.noEvents': 'Saat ini belum ada acara yang dijadwalkan – acara baru akan diumumkan di sini.',
    'home.later': 'Acara Lainnya',
    'home.review': 'Kilas Balik',
    'home.allEvents': 'Semua Acara →',
    'cta.title': 'Jadi Anggota',
    'cta.text': 'Dukung budaya Indonesia di Swiss dan proyek amal di Indonesia.',
    'cta.button': 'Selengkapnya',
    'events.title': 'Acara',
    'events.eyebrow': 'Agenda',
    'events.lead': 'Budaya, kuliner, dan kebersamaan – semua acara perkumpulan kami.',
    'events.upcoming': 'Akan Datang',
    'events.none': 'Saat ini belum ada acara yang dijadwalkan. Silakan kunjungi kembali nanti.',
    'event.eyebrow': 'Acara',
    'event.date': 'Tanggal',
    'event.time': 'Waktu',
    'event.place': 'Tempat',
    'event.route': 'Petunjuk arah ↗',
    'event.back': '← Semua Acara',
    'event.flyer': 'Flyer',
    'team.title': 'Pengurus Perkumpulan',
    'footer.contact': 'Kontak',
    'footer.facebook': 'Grup Facebook',
    'footer.donations': 'Donasi',
    'footer.fees': 'Iuran Anggota',
    'footer.account': 'Nomor rekening',
    'email.reveal': 'Tampilkan alamat email',
    'ig.follow': 'Ikuti kami',
    'ig.post': 'Unggahan Instagram',
    'notTranslated': 'Konten ini belum tersedia dalam Bahasa Indonesia. Berikut versi bahasa Jerman.',
  },
} satisfies Record<Lang, Record<string, string>>;

export const t = (lang: Lang, key: keyof (typeof ui)['de']) => ui[lang][key];

/** "/events/" → "/id/events/" for Indonesian. */
export const localePath = (lang: Lang, path: string) => (lang === 'de' ? path : `/id${path}`);

/** Path of the same page in the other language. */
export const switchPath = (path: string, to: Lang) => {
  const base = path.startsWith('/id/') ? path.slice(3) : path === '/id' ? '/' : path;
  return localePath(to, base);
};

/** Title/summary in the requested language, falling back to German when not translated. */
export function localized<T extends { title: string; summary?: string; indonesia?: { title?: string; summary?: string } }>(data: T, lang: Lang) {
  if (lang === 'de') return data;
  return { ...data, title: data.indonesia?.title || data.title, summary: data.indonesia?.summary || data.summary };
}
