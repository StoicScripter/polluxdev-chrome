/**
 * @polluxdev/chrome — the pollux|dev header and footer, framework-free.
 *
 * `renderHeader` / `renderFooter` return HTML strings; styles/chrome.css styles
 * them (after styles/tokens.css); `@polluxdev/chrome/nav` wires the header.
 * The data and i18n modules the chrome reads are re-exported so the site can
 * keep a single source for every nav string, route and locale.
 */
export { renderHeader } from './render/header.js';
export { renderFooter } from './render/footer.js';
export { html, raw, attr, escape, SafeHtml } from './html.js';
export { languageChoices } from './render/parts.js';
export * from './data/site.js';
export * from './data/routes.js';
export * from './i18n/config.js';
export * from './i18n/routes.js';
export * from './i18n/ui.js';
