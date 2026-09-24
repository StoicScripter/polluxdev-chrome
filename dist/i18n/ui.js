/**
 * UI chrome around localized content — labels the layout draws, never page
 * copy, which stays with the page that owns it.
 *
 * `satisfies` keeps the keys inferred (so `t()` autocompletes) while still
 * failing the build if any string is missing a locale.
 */
export const ui = {
    'skip.toContent': { en: 'Skip to content', de: 'Zum Inhalt springen' },
    'legal.updated': { en: 'Last updated', de: 'Zuletzt aktualisiert' },
    /* Landmark names and the controls the chrome draws for itself. */
    'nav.primary': { en: 'Primary', de: 'Hauptnavigation' },
    'nav.footer': { en: 'Footer', de: 'Fußzeile' },
    'nav.menu': { en: 'Menu', de: 'Menü' },
    /* Language picker. The options themselves are endonyms and are never
       translated — see localeNames in ./config. */
    'language.label': { en: 'Language', de: 'Sprache' },
    'language.unavailable': {
        en: 'This page is not available in this language yet.',
        de: 'Diese Seite ist in dieser Sprache noch nicht verfügbar.',
    },
    /* The footer's reopen control. Withdrawing consent has to be as easy as
       giving it, which means a way back into the dialog on every page. */
    'cookies.settings': { en: 'Cookie settings', de: 'Cookie-Einstellungen' },
};
export function t(key, locale) {
    return ui[key][locale];
}
