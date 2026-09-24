/**
 * Locale primitives. Mirrors the `i18n` block in the site's astro.config.mjs: English is
 * the default and stays at the root, German is served under /de.
 *
 * This module holds no copy. UI chrome lives in ./ui.ts and page metadata in
 * ./routes.ts in ../data — both key off the `Locale` type declared here, so adding a
 * third locale is a compile error everywhere it needs a translation.
 */
export declare const locales: readonly ["en", "de"];
export type Locale = (typeof locales)[number];
export declare const defaultLocale: Locale;
/** Endonyms — a language is always offered in its own language, never translated. */
export declare const localeNames: Record<Locale, string>;
/** BCP-47 tags for `lang`, `hreflang` and `og:locale`. */
export declare const localeTags: Record<Locale, string>;
/**
 * Full tags, used wherever a region changes the output: dates, og:locale and the
 * currency and grouping separators Intl draws for prices (src/data/pricing.ts).
 */
export declare const regionTags: Record<Locale, string>;
export declare const ogLocales: Record<Locale, string>;
export declare function formatDate(iso: string, locale: Locale): string;
