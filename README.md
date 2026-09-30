# @polluxdev/chrome

The pollux|dev site header and footer, framework-free: render functions that
return HTML strings, one stylesheet, one behaviour script. Used by
polluxdev.com (Astro) and the Dropby demo (a plain Cloudflare Worker), so both
draw the same navigation from the same data.

The package also owns the data the chrome reads — nav and footer copy
(`src/data/site.ts`), the route registries for contact, the service pages, blog, legal and 404
(`src/data/routes.ts`), and the locale/i18n modules (`src/i18n/*`). The site
re-exports these rather than keeping its own copies, so every nav string and
route is written once.

## Use

```js
import { renderHeader, renderFooter } from '@polluxdev/chrome';

renderHeader({ locale: 'de', path: '/apps/dropby-store-locator/', baseUrl: 'https://polluxdev.com' });
renderFooter({ locale: 'de', path: '/apps/dropby-store-locator/', baseUrl: 'https://polluxdev.com', cookieSettings: false });
```

- `path` is the page's own site-absolute path. It drives the active-section
  underline and the language options, and is always compared unprefixed.
- `baseUrl` prefixes every site-absolute href. Leave it empty on polluxdev.com;
  pass the live origin anywhere else.
- `cookieSettings` draws the footer's "Cookie settings" control, which needs
  vanilla-cookieconsent on the page. Defaults to `true`.

Styles, in order: `styles/tokens.css`, `styles/fallbacks.css`,
`styles/chrome.css`. Every chrome rule is scoped to `.site-header` /
`.site-footer` or carries the `pc-` prefix, so the sheet is safe on a page it
does not own. The page must provide the fonts: `--font-manrope` and
`--font-archivo` (the site uses Astro's font pipeline; elsewhere, Google Fonts).

Behaviour: import `@polluxdev/chrome/nav` (or serve `dist/nav.js` as a module).
It wires the page's `[data-header]`. Set `document.documentElement.dataset.js`
first — the mobile menu toggle is only offered when that marker is present.

## Develop

```
npm install
npm test          # builds, then runs node:test
```

`dist/` is committed: consumers install this package as a git dependency
(`github:StoicScripter/polluxdev-chrome#vX.Y.Z`), and a git dependency must work
without a build step. Rebuild and commit `dist/` with every change, then tag.

The parity test compares the rendered markup with a pre-migration build of the
site, class names aside:

```
BASELINE_DIST=/path/to/old/dist/client node --test
```
