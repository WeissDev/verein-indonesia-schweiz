# CLAUDE.md

## Git
- Do not add `Co-Authored-By` trailers or any other AI attribution to commit messages or PR descriptions.

## Project notes
- Astro static site; content edited by non-technical members via Pages CMS (`.pages.yml`).
- Field names in `.pages.yml` must match the zod schema in `src/content.config.ts`.
- Images live in `src/assets/images/` and are referenced as `@images/...` (alias in `tsconfig.json`); YAML values starting with `@` must be quoted.
- Site language is German (de-CH); keep UI text and editor labels in German.
- Checks: `npm test` and `npm run build`.
