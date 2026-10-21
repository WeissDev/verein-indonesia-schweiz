# Verein Indonesia Schweiz – Website

Static [Astro](https://astro.build) site, edited with [Pages CMS](https://app.pagescms.org), hosted on Cloudflare Pages.

## Für Redaktor:innen: Event erfassen

1. <https://app.pagescms.org> öffnen und mit GitHub anmelden.
2. Repository **verein-indonesia-schweiz** wählen → **Events** → **Neu / Add an entry**.
3. Titel, Datum, Zeit, Ort, Flyer und Kurzbeschreibung ausfüllen, Text schreiben.
4. **Speichern**. Nach ca. 1–2 Minuten ist der Event online.
   Kommende Events erscheinen automatisch auf der Startseite; vergangene wandern ins Archiv.

Tipp: «Entwurf» ankreuzen, um einen Event zu speichern, ohne ihn zu veröffentlichen.
Startseite, «Über uns» und «Mitgliedschaft» lassen sich gleich bearbeiten (Startseite / Seiten).

## Development

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # → dist/
npm test
```

- Content: `src/content/events/**.md`, `src/content/pages/*.md`; schema in `src/content.config.ts`.
- Editor forms: `.pages.yml` (field names must match the schema).
- Images/PDFs: `public/`.

## Hosting (one-time setup)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → connect this GitHub repo.
   Build command `npm run build`, output `dist`, env var `NODE_VERSION=22`.
2. Add the custom domain `vereinindonesiaschweiz.ch`.
3. Settings → Builds → Deploy hooks → create one for `main`; save its URL as the GitHub repo secret `CF_DEPLOY_HOOK`
   (used by `.github/workflows/nightly-rebuild.yml` so past events leave the homepage).
4. Editors: invite their GitHub accounts as repo collaborators (Write access), then they log in at app.pagescms.org.
