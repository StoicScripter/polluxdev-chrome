/**
 * The small pieces the header and footer are assembled from: the ± chip, the
 * button, the mega-menu card and panel, and the link resolver every href goes
 * through. Each was an .astro component in the site (ToggleChip, Button,
 * MegaMenuCard, MegaMenu); their styles are in styles/chrome.css under the same
 * pc- names.
 */
import { languageOptions } from '../i18n/routes.js';
import { html } from '../html.js';
/**
 * The language options the picker and the footer draw. By default they come
 * from the site's route table (../i18n/routes.ts). A page that is not a site
 * page — the Dropby demo, which is its own page in every language — passes
 * `alternates` instead; a language it leaves out is drawn as unavailable.
 */
export function languageChoices(path, locale, alternates) {
    const options = languageOptions(path, locale);
    if (!alternates)
        return options;
    return options.map((option) => ({ ...option, href: alternates[option.locale] ?? null }));
}
/**
 * Whether the page exists in any language besides the one being read. When it
 * does not, the picker and the footer's Languages column are left out: a
 * switch whose only other option is "not translated yet" is a control with
 * nothing to do.
 */
export function hasTranslation(options) {
    return options.some((option) => !option.current && option.href);
}
/**
 * Resolves a site-absolute href for wherever the chrome is being drawn. On
 * polluxdev.com `baseUrl` is empty and links stay root-relative; anywhere else
 * (the Dropby demo) they are prefixed with the live origin, because a
 * root-relative /contact/ would otherwise point at the host's own domain.
 *
 * Path matching (the active underline, the language options) always runs on
 * the unprefixed path — this is applied last, at the moment of writing `href`.
 */
export function linkResolver(baseUrl = '') {
    const base = baseUrl.replace(/\/+$/, '');
    return (href) => (base && href.startsWith('/') && !href.startsWith('//') ? base + href : href);
}
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
export function toggleChip() {
    return html `<span class="pc-chip" aria-hidden="true"><svg class="pc-chip-glyph" viewBox="0 0 23 23" width="23" height="23"><line class="pc-chip-bar pc-chip-bar-h" x1="5.5" y1="11.5" x2="17.5" y2="11.5"></line><line class="pc-chip-bar pc-chip-bar-v" x1="11.5" y1="5.5" x2="11.5" y2="17.5"></line></svg></span>`;
}
/**
 * Mega-menu card (CLAUDE.md §4): 246×282, --surface-dark, --r-md, title +
 * description + a bottom-left arrow chip. The whole card floods --brand on
 * hover. Below 960px it is a plain stacked link with a small north-east arrow
 * instead. Both arrows are presentational; the link text carries the destination.
 */
export function megaCard(card, link) {
    return html `<a class="pc-card" href="${link(card.href)}"><span class="pc-card-title">${card.label}</span><span class="pc-card-desc">${card.description}</span><span class="pc-card-spacer"></span><span class="pc-card-arrow" aria-hidden="true"><span class="pc-card-glyph">→</span></span><svg class="pc-arrow-ne" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><line x1="1.4" y1="10.6" x2="10.2" y2="1.8"></line><polyline points="3.8,1.8 10.2,1.8 10.2,8.2"></polyline></svg></a>`;
}
/** One menu's dropdown panel. Ships `hidden`; src/nav.ts opens it. */
export function megaMenu(menu, link) {
    return html `<div class="pc-mega" id="menu-${menu.id}" data-menu-panel="${menu.id}" hidden><div class="pc-container pc-mega-grid">${menu.cards.map((card) => megaCard(card, link))}</div></div>`;
}
