/**
 * Site footer, on the dark panel ground: bold off-white group names over
 * off-white links, one centred column on phones — see the site's CLAUDE.md §6.
 *
 * The Languages column is the header picker without the dropdown: the same
 * options, from the same registry, so the two can never offer different
 * destinations. A language this page has no translation in is stated as text
 * with a reason rather than linked to a page that isn't built.
 *
 * Ported from the site's Footer.astro; styles are styles/chrome.css.
 */
import { type Locale } from '../i18n/config.js';
import { type Alternates } from './parts.js';
export interface FooterOptions {
    /** The language this page is being read in. */
    locale?: Locale;
    /** The page's own site-absolute path, unprefixed — see HeaderOptions.path. */
    path: string;
    /** Prefix for every site-absolute href. Empty on polluxdev.com itself. */
    baseUrl?: string;
    /**
     * This page in each language, overriding the site's route table for the
     * language options — for a page that is not a site page (the Dropby demo).
     */
    alternates?: Alternates;
    /**
     * Draw the "Cookie settings" control. It reopens vanilla-cookieconsent's
     * dialog through the library's delegated `data-cc` hook, so it is only
     * meaningful on a page that loads that library. Defaults to true (the site).
     */
    cookieSettings?: boolean;
    /** Overrides the copyright year. Defaults to the year at render time. */
    year?: number;
}
export declare function renderFooter({ locale, path, baseUrl, cookieSettings, year, alternates, }: FooterOptions): string;
