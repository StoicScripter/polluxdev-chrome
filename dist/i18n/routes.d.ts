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
import { type Locale } from './config.js';
/** One page, in every locale it exists in. `null` means "not translated yet". */
export type LocalePaths = Record<Locale, string | null>;
/**
 * Trailing slashes and case are URL noise, not identity: the dev server answers
 * /privacy, the build writes /privacy/, and both are the same page.
 *
 * Exported because the header's active-section underline has to compare paths
 * the same way this module does.
 */
export declare function normalizePath(path: string): string;
/**
 * The current page in every locale. Anything unknown is treated as existing
 * only in the locale it is being rendered in — which is true of every page that
 * has not been translated yet.
 */
export declare function localePaths(pathname: string, current: Locale): LocalePaths;
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
export declare function languageOptions(pathname: string, current: Locale): LanguageOption[];
