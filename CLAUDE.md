# CLAUDE.md

## Git
- Do not add `Co-Authored-By` trailers or any other AI attribution to commit messages or PR descriptions.

## Project notes
- Astro static site; content edited by non-technical members via Pages CMS (`.pages.yml`).
- Field names in `.pages.yml` must match the zod schema in `src/content.config.ts`.
- Images live in `src/assets/images/` and are referenced as `@images/...` (alias in `tsconfig.json`); YAML values starting with `@` must be quoted.
- Two languages: German (default, `/`) and Indonesian (`/id/`). UI strings live in `src/i18n.ts` (add every new string in both languages); content translations are the `indonesia:` object in each file's frontmatter, falling back to German. Page markup lives in `src/views/`; `src/pages/` and `src/pages/id/` only pick the language.
- Editor labels in `.pages.yml` are German.
- Checks: `npm test` and `npm run build`.
