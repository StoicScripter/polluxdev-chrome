/**
 * Which pages exist in which language, and what the same page is called in the
 * other one.
 *
 * The language picker and the footer's Languages column both need to answer one
 * question — "where is this page in German?" — and neither may answer it by
 * guessing at the URL: German routes carry German slugs (/privacy → /de/datenschutz),
 * so a prefix rule would send readers to pages that do not exist.
 *
 * The answer is derived from the registries that already own those paths
 * (../data/routes.ts) rather than re-typed here, so a slug rename moves the
 * language link with it. A page that has no translation yet says so — it never
 * falls back to a locale root that isn't built.
 *
 * Imports only the registries and ./config, both of which import nothing but
 * types, so this module stays free of cycles.
 */

import { blogRoutes, contactRoutes, legalDocs, legalOrder, notFoundRoutes } from '../data/routes.js';
import { localeNames, localeTags, locales, type Locale } from './config.js';

/** One page, in every locale it exists in. `null` means "not translated yet". */
export type LocalePaths = Record<Locale, string | null>;

/**
 * Every page the site serves, keyed by nothing: the row is found by matching any
 * of its own paths. Pages absent from this table (the service pages, the
 * individual posts) are English-only for now and fall through to the default
 * below.
 */
const pages: LocalePaths[] = [
	// The homepage. German joins it when /de is built; until then the picker
	// reports German as unavailable here rather than linking to a 404.
	{ en: '/', de: null },

	...legalOrder.map((id) => ({
		en: legalDocs[id].locales.en.path,
		de: legalDocs[id].locales.de.path,
	})),

	{ en: contactRoutes.en.path, de: contactRoutes.de.path },

	// The index only. A post is written once, in English, and lives at
	// /blog/<slug> whichever index the reader arrived from.
	{ en: blogRoutes.en.path, de: blogRoutes.de.path },

	// Both error routes exist, so the picker on a 404 offers the 404 the reader
	// can actually read rather than reporting the language as unavailable.
	{ en: notFoundRoutes.en.path, de: notFoundRoutes.de.path },
];

/**
 * Trailing slashes and case are URL noise, not identity: the dev server answers
 * /privacy, the build writes /privacy/, and both are the same page.
 *
 * Exported because the header's active-section underline has to compare paths
 * the same way this module does.
 */
export function normalizePath(path: string): string {
	const trimmed = path.toLowerCase().replace(/\/+$/, '');
	return trimmed === '' ? '/' : trimmed;
}

/**
 * The current page in every locale. Anything unknown is treated as existing
 * only in the locale it is being rendered in — which is true of every page that
 * has not been translated yet.
 */
export function localePaths(pathname: string, current: Locale): LocalePaths {
	const key = normalizePath(pathname);
	const row = pages.find((page) =>
		locales.some((locale) => page[locale] && normalizePath(page[locale]!) === key),
	);
	if (row) return row;

	const fallback = Object.fromEntries(locales.map((locale) => [locale, null])) as LocalePaths;
	fallback[current] = pathname;
	return fallback;
}

export interface LanguageOption {
	locale: Locale;
	/** The endonym — a language is always offered in its own language. */
	label: string;
	/** BCP-47 tag, for `lang` and `hreflang` on the option. */
	tag: string;
	/** Where this page lives in that language, or null if it doesn't yet. */
	href: string | null;
	current: boolean;
}

/**
 * The language list the picker and the footer both draw, in locale order, with
 * the language of the page being read marked. Options without a translation
 * carry a null href — the caller renders them as text, never as a dead link.
 */
export function languageOptions(pathname: string, current: Locale): LanguageOption[] {
	const paths = localePaths(pathname, current);

	return locales.map((locale) => ({
		locale,
		label: localeNames[locale],
		tag: localeTags[locale],
		href: paths[locale],
		current: locale === current,
	}));
}
