/**
 * Locale primitives. Mirrors the `i18n` block in the site's astro.config.mjs: English is
 * the default and stays at the root, German is served under /de.
 *
 * This module holds no copy. UI chrome lives in ./ui.ts and page metadata in
 * ./routes.ts in ../data — both key off the `Locale` type declared here, so adding a
 * third locale is a compile error everywhere it needs a translation.
 */
export const locales = ['en', 'de'];
export const defaultLocale = 'en';
/** Endonyms — a language is always offered in its own language, never translated. */
export const localeNames = {
    en: 'English',
    de: 'Deutsch',
};
/** BCP-47 tags for `lang`, `hreflang` and `og:locale`. */
export const localeTags = {
    en: 'en',
    de: 'de',
};
/**
 * Full tags, used wherever a region changes the output: dates, og:locale and the
 * currency and grouping separators Intl draws for prices (src/data/pricing.ts).
 */
export const regionTags = {
    en: 'en-US',
    de: 'de-DE',
};
export const ogLocales = {
    en: 'en_US',
    de: 'de_DE',
};
/**
 * Renders an ISO date in the reader's locale — "March 18, 2026" against
 * "18. März 2026". Dates are stored once as ISO and never typed out per
 * language, so a document cannot end up claiming two different update dates.
 *
 * Forced to UTC: the date is a fact about the document, not about the machine
 * that happened to build it.
 *
 * Two shapes reach this: the legal and contact registries store a date alone
 * ("2026-03-18"), Sanity stores a full timestamp ("2026-05-14T08:00:00.000Z").
 * The time is appended only when the string does not already carry one --
 * appending it unconditionally produced "...ZT00:00:00Z" and an Invalid Date on
 * every post byline.
 */
function toInstant(iso) {
    return iso.includes('T') ? iso : `${iso}T00:00:00Z`;
}
export function formatDate(iso, locale) {
    return new Intl.DateTimeFormat(regionTags[locale], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(toInstant(iso)));
}
