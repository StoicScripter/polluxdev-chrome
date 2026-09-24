/**
 * Site footer. The heading/link weights are deliberately inverted from the rest
 * of the site (light 400 headings, bold black links) — see the site's
 * CLAUDE.md §6.
 *
 * The Languages column is the header picker without the dropdown: the same
 * options, from the same registry, so the two can never offer different
 * destinations. A language this page has no translation in is stated as text
 * with a reason rather than linked to a page that isn't built.
 *
 * Ported from the site's Footer.astro; styles are styles/chrome.css.
 */
import { footer, site } from '../data/site.js';
import { defaultLocale } from '../i18n/config.js';
import { t } from '../i18n/ui.js';
import { attr, html } from '../html.js';
import { languageChoices, linkResolver } from './parts.js';
export function renderFooter({ locale = defaultLocale, path, baseUrl = '', cookieSettings = true, year = new Date().getFullYear(), alternates, }) {
    const link = linkResolver(baseUrl);
    const nav = footer(locale);
    const languages = languageChoices(path, locale, alternates);
    // A sibling rule rather than a border on the inner container, so the hairline
    // runs the full width of the viewport while the content stays at 1320px.
    return html `<footer class="site-footer"><div class="pc-rule" aria-hidden="true"></div><div class="pc-container pc-inner"><div class="pc-top"><div class="pc-brand"><p class="pc-wordmark">${site.name}</p><p class="pc-positioning">${site.positioning[locale]}</p></div><nav class="pc-columns" aria-label="${t('nav.footer', locale)}">${nav.columns.map((column) => html `<div class="pc-column"><h2 class="pc-column-heading">${column.heading}</h2><ul class="pc-column-links">${column.links.map((item) => html `<li><a href="${link(item.href)}">${item.label}</a></li>`)}</ul></div>`)}<div class="pc-column"><h2 class="pc-column-heading">${nav.languages.heading}</h2><ul class="pc-column-links">${languages.map((language) => html `<li>${language.href
        ? html `<a href="${link(language.href)}" lang="${language.tag}" hreflang="${language.tag}"${attr('aria-current', language.current && 'true')}>${language.label}</a>`
        : html `<span class="pc-unavailable" aria-disabled="true"><span lang="${language.tag}">${language.label}</span><span class="pc-hint">${t('language.unavailable', locale)}</span></span>`}</li>`)}</ul></div></nav></div><div class="pc-bottom"><div class="pc-legal"><p class="pc-copyright">© ${year} ${site.name} — ${site.madeIn[locale]}</p><div class="pc-legal-block"><h2 class="pc-column-heading pc-bottom-heading">${nav.legal.heading}</h2><ul class="pc-legal-links">${nav.legal.links.map((item) => html `<li><a href="${link(item.href)}">${item.label}</a></li>`)}${cookieSettings &&
        html `<li><button type="button" class="pc-cookie-settings" data-cc="show-preferencesModal">${t('cookies.settings', locale)}</button></li>`}</ul></div></div><div class="pc-social-block"><h2 class="pc-column-heading pc-bottom-heading">${nav.social.heading}</h2><ul class="pc-social"><li><a href="${site.youtube}" rel="me noopener" target="_blank"><span class="pc-social-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.5 6.9a3 3 0 0 0-2.1-2.1C19.5 4.3 12 4.3 12 4.3s-7.5 0-9.4.5A3 3 0 0 0 .5 6.9C0 8.8 0 12 0 12s0 3.2.5 5.1a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.1.5-5.1s0-3.2-.5-5.1zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"></path></svg></span>Youtube</a></li><li><a href="${site.shopify}" rel="me noopener" target="_blank"><span class="pc-social-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"></path></svg></span>Shopify</a></li></ul></div></div></div></footer>`.toString();
}
