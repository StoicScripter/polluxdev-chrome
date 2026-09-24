/**
 * Sticky site header. Services ± · Apps ± · Company ± · language · [CTA].
 *
 * Menus open on click, never on hover: the ± chip promises a committed toggle,
 * and click is the only pattern that works on touch. Without JavaScript the
 * menus stay closed and every destination remains reachable from the footer —
 * the language picker included, which the footer's Languages column mirrors.
 *
 * Ported from the site's Header.astro, LanguagePicker.astro, MegaMenu.astro,
 * MegaMenuCard.astro, ToggleChip.astro and Button.astro. Behaviour is ../nav.ts;
 * styles are styles/chrome.css.
 */
import { type Locale } from '../i18n/config.js';
import { type Alternates } from './parts.js';
export interface HeaderOptions {
    /** The language this page is being read in. */
    locale?: Locale;
    /**
     * The page's own site-absolute path, unprefixed. Drives the active-section
     * underline and the language options; on the demo, pass the path of the page
     * the demo stands in for (the Dropby app page).
     */
    path: string;
    /** Prefix for every site-absolute href. Empty on polluxdev.com itself. */
    baseUrl?: string;
    /**
     * This page in each language, overriding the site's route table for the
     * language options — for a page that is not a site page (the Dropby demo).
     */
    alternates?: Alternates;
}
export declare function renderHeader({ locale, path, baseUrl, alternates }: HeaderOptions): string;
