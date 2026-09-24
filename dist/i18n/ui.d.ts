import type { Locale } from './config.js';
/**
 * UI chrome around localized content — labels the layout draws, never page
 * copy, which stays with the page that owns it.
 *
 * `satisfies` keeps the keys inferred (so `t()` autocompletes) while still
 * failing the build if any string is missing a locale.
 */
export declare const ui: {
    'skip.toContent': {
        en: string;
        de: string;
    };
    'legal.updated': {
        en: string;
        de: string;
    };
    'nav.primary': {
        en: string;
        de: string;
    };
    'nav.footer': {
        en: string;
        de: string;
    };
    'nav.menu': {
        en: string;
        de: string;
    };
    'language.label': {
        en: string;
        de: string;
    };
    'language.unavailable': {
        en: string;
        de: string;
    };
    'cookies.settings': {
        en: string;
        de: string;
    };
};
export type UiKey = keyof typeof ui;
export declare function t(key: UiKey, locale: Locale): string;
