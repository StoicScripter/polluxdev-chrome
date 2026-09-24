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

import { headerCta, menus, site } from '../data/site.js';
import { defaultLocale, type Locale } from '../i18n/config.js';
import { localePaths, normalizePath } from '../i18n/routes.js';
import { t } from '../i18n/ui.js';
import { attr, html, type SafeHtml } from '../html.js';
import { languageChoices, linkResolver, megaMenu, toggleChip, type Alternates } from './parts.js';

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

/**
 * The language picker: a globe, the language you are reading in, and the
 * dropdown holding both languages. It rides the mega menus' `data-menu-trigger`
 * / `data-menu-panel` contract, so ../nav.ts already closes it.
 *
 * The chevron is the one place in the system a chevron appears; it is a select,
 * not a disclosure. A language with no translation of this page is drawn as
 * muted text with a reason — the picker never links to a page that isn't built.
 */
function languagePicker(locale: Locale, path: string, link: (href: string) => string, alternates?: Alternates): SafeHtml {
	const options = languageChoices(path, locale, alternates);
	const here = options.find((option) => option.current) ?? options[0];

	return html`<li class="pc-lang" data-menu-item="language"><button type="button" class="pc-lang-trigger" data-menu-trigger="language" aria-expanded="false" aria-controls="menu-language"><svg class="pc-globe" viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="7.25"></circle><ellipse cx="9" cy="9" rx="3.15" ry="7.25"></ellipse><line x1="1.75" y1="9" x2="16.25" y2="9"></line></svg><span class="pc-visually-hidden">${t('language.label', locale)}: </span><span class="pc-lang-current" lang="${here.tag}">${here.label}</span><svg class="pc-chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><polyline points="2.4,4.4 6,8 9.6,4.4"></polyline></svg></button><div class="pc-lang-panel" id="menu-language" data-menu-panel="language" hidden><ul class="pc-lang-options">${options.map(
		(option) =>
			html`<li>${
				option.href
					? html`<a class="pc-lang-option" href="${link(option.href)}" lang="${option.tag}" hreflang="${option.tag}"${attr('aria-current', option.current && 'true')}>${option.label}</a>`
					: html`<span class="pc-lang-option pc-unavailable" aria-disabled="true"><span lang="${option.tag}">${option.label}</span><span class="pc-hint">${t('language.unavailable', locale)}</span></span>`
			}</li>`,
	)}</ul></div></li>`;
}

export function renderHeader({ locale = defaultLocale, path, baseUrl = '', alternates }: HeaderOptions): string {
	const link = linkResolver(baseUrl);
	const sections = menus(locale);
	const cta = headerCta(locale);

	/**
	 * This page in every language it exists in. The nav is written in English, so
	 * a German page is recognised through its English translation — /de/kontakt
	 * is a Company page for the same reason /contact is.
	 */
	const paths = Object.values(localePaths(path, locale))
		.filter((value): value is string => Boolean(value))
		.map(normalizePath);

	/**
	 * Does this card's destination contain the page being read? Compared segment
	 * by segment, so /about does not claim /about-us, and with the trailing slash
	 * normalised away. The homepage is deliberately never owned: it would
	 * otherwise match every card.
	 */
	const covers = (href: string): boolean => {
		const target = normalizePath(href.split('#')[0]);
		if (target === '/') return false;
		return paths.some((p) => p === target || p.startsWith(`${target}/`));
	};

	/**
	 * Which top-level item, if any, owns the current URL. Cross-links are
	 * skipped: the Apps menu offers a shortcut to /contact, but Contact is
	 * Company's page, and only the menu that owns a page underlines for it.
	 */
	const currentMenu = sections.find((menu) =>
		menu.cards.some((card) => !card.crossLink && covers(card.href)),
	)?.id;

	/** A button that offers the page you are already reading is noise. */
	const onCtaTarget = covers(cta.href);

	return html`<header class="site-header" data-header><div class="pc-container pc-bar"><a class="pc-wordmark" href="${link('/')}">${site.name}</a><nav class="pc-primary" id="primary-nav" aria-label="${t('nav.primary', locale)}"><ul class="pc-nav-list" data-nav-list>${sections.map(
		(menu) =>
			html`<li class="pc-nav-item" data-menu-item="${menu.id}"><button type="button" class="pc-trigger" data-menu-trigger="${menu.id}" aria-expanded="false" aria-controls="menu-${menu.id}"${attr('aria-current', currentMenu === menu.id && 'true')}><span class="pc-trigger-label" data-nav-label>${menu.label}</span>${toggleChip()}</button>${megaMenu(menu, link)}</li>`,
	)}${languagePicker(locale, path, link, alternates)}</ul></nav><div class="pc-actions">${
		!onCtaTarget &&
		html`<a class="pc-btn pc-btn-primary pc-size-nav pc-cta" href="${link(cta.href)}">${cta.label}</a>`
	}<button type="button" class="pc-mobile-toggle" data-mobile-toggle aria-expanded="false" aria-controls="primary-nav"><span class="pc-visually-hidden">${t('nav.menu', locale)}</span><span class="pc-icon-button" aria-hidden="true"><svg class="pc-burger" viewBox="0 0 17 17" width="17" height="17"><line class="pc-burger-bar pc-burger-top" x1="1.5" y1="4" x2="15.5" y2="4"></line><line class="pc-burger-bar pc-burger-mid" x1="1.5" y1="8.5" x2="15.5" y2="8.5"></line><line class="pc-burger-bar pc-burger-bot" x1="1.5" y1="13" x2="15.5" y2="13"></line></svg></span></button></div></div><span class="pc-nav-rail" data-nav-rail aria-hidden="true"></span></header>`.toString();
}
