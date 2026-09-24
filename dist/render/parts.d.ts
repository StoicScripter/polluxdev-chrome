/**
 * The small pieces the header and footer are assembled from: the ± chip, the
 * button, the mega-menu card and panel, and the link resolver every href goes
 * through. Each was an .astro component in the site (ToggleChip, Button,
 * MegaMenuCard, MegaMenu); their styles are in styles/chrome.css under the same
 * pc- names.
 */
import type { Card, MegaMenu } from '../data/site.js';
import type { Locale } from '../i18n/config.js';
import { type LanguageOption } from '../i18n/routes.js';
import { type SafeHtml } from '../html.js';
/** Where this page lives in each language, when the caller knows better than the site's route table. */
export type Alternates = Partial<Record<Locale, string>>;
/**
 * The language options the picker and the footer draw. By default they come
 * from the site's route table (../i18n/routes.ts). A page that is not a site
 * page — the Dropby demo, which is its own page in every language — passes
 * `alternates` instead; a language it leaves out is drawn as unavailable.
 */
export declare function languageChoices(path: string, locale: Locale, alternates?: Alternates): LanguageOption[];
/**
 * Resolves a site-absolute href for wherever the chrome is being drawn. On
 * polluxdev.com `baseUrl` is empty and links stay root-relative; anywhere else
 * (the Dropby demo) they are prefixed with the live origin, because a
 * root-relative /contact/ would otherwise point at the host's own domain.
 *
 * Path matching (the active underline, the language options) always runs on
 * the unprefixed path — this is applied last, at the moment of writing `href`.
 */
export declare function linkResolver(baseUrl?: string): (href: string) => string;
/**
 * The ± toggle — the system's smallest signature (CLAUDE.md §4). 23px chip, two
 * 1.6px bars, the vertical bar rotating 90° on open.
 *
 * The bars are SVG strokes rather than positioned boxes on purpose: a 1.6px box
 * has its left and right edges snapped to the pixel grid independently, so the
 * same bar rasterises as 1px or 2px depending on where its chip happens to land.
 * A stroke is antialiased instead, so 1.6px reads as 1.6px at any subpixel
 * offset. Presentational and stateless: the open state is read from an ancestor
 * carrying `data-open`.
 */
export declare function toggleChip(): SafeHtml;
/**
 * Mega-menu card (CLAUDE.md §4): 246×282, --surface-dark, --r-md, title +
 * description + a bottom-left arrow chip. The whole card floods --brand on
 * hover. Below 960px it is a plain stacked link with a small north-east arrow
 * instead. Both arrows are presentational; the link text carries the destination.
 */
export declare function megaCard(card: Card, link: (href: string) => string): SafeHtml;
/** One menu's dropdown panel. Ships `hidden`; src/nav.ts opens it. */
export declare function megaMenu(menu: MegaMenu, link: (href: string) => string): SafeHtml;
