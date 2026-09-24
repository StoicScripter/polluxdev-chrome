/**
 * The route registries the header, the footer and the language picker read.
 *
 * Each registry owns one page family's paths and metadata in every locale, so
 * the route, the canonical URL, the hreflang set and every link that points at
 * the page read the same string. German pages carry German slugs, not
 * translated English ones.
 *
 * They live in this package rather than in the site because the chrome has to
 * link to these pages wherever it is drawn — on polluxdev.com and on the Dropby
 * demo alike. The site's own src/data modules re-export them and keep the page
 * copy (form labels, the 404 sentence, blog filter copy) that only a page needs.
 *
 * Imports nothing but ../i18n/config, which is what lets ./site.ts and
 * ../i18n/routes.ts both import it without a cycle.
 */
import { defaultLocale } from '../i18n/config.js';
export const contactRoutes = {
    en: {
        path: '/contact/',
        title: 'Contact',
        navLabel: 'Contact',
        description: 'Tell us what your Shopify store needs to do. Send the brief in plain language and get an honest answer on feasibility, effort and cost — usually within a working day.',
    },
    de: {
        path: '/de/kontakt/',
        title: 'Kontakt',
        navLabel: 'Kontakt',
        description: 'Sagen Sie uns, was Ihr Shopify-Shop können muss. Beschreiben Sie die Aufgabe in klaren Worten und erhalten Sie eine ehrliche Einschätzung zu Machbarkeit, Aufwand und Kosten — meist innerhalb eines Werktags.',
    },
};
export function contactPath(locale = defaultLocale) {
    return contactRoutes[locale].path;
}
/**
 * The index exists twice — /blog/ and /de/blog/ — but a post exists once, in
 * English, at /blog/<slug>/ (the site's `postPath`).
 */
export const blogRoutes = {
    en: {
        path: '/blog/',
        title: 'Blog — pollux|dev',
        description: 'What we learn building Shopify stores and apps, written for merchants rather than developers.',
    },
    de: {
        path: '/de/blog/',
        title: 'Blog — pollux|dev',
        description: 'Was wir beim Bauen von Shopify-Shops und -Apps lernen — geschrieben für Händler, nicht für Entwickler.',
    },
};
export function blogPath(locale = defaultLocale) {
    return blogRoutes[locale].path;
}
/* ----------------------------------------------------------------- legal */
export const legalDocIds = ['legal-notice', 'privacy', 'terms'];
/**
 * Registry for the three legal documents. Body copy is NOT here — it is page
 * content and lives in the site's .astro pages, one per document per locale.
 *
 * CLAUDE.md §7: metadata on these pages is content, not boilerplate.
 */
export const legalDocs = {
    'legal-notice': {
        id: 'legal-notice',
        updated: '2026-09-04',
        locales: {
            en: {
                path: '/legal-notice/',
                title: 'Legal Notice',
                navLabel: 'Legal Notice',
                description: 'Company details, registered address, VAT number and contact information for Schmezko & Gottselich GbR, trading as pollux|dev.',
            },
            de: {
                path: '/de/impressum/',
                title: 'Impressum',
                navLabel: 'Impressum',
                description: 'Angaben gemäß § 5 DDG: Anschrift, Vertretungsberechtigte, Umsatzsteuer-Identifikationsnummer und Kontaktdaten der Schmezko & Gottselich GbR (pollux|dev).',
            },
        },
    },
    privacy: {
        id: 'privacy',
        // Bumped when consent and Google Analytics shipped: a necessary consent
        // cookie, and analytics that runs only once a reader agrees to it.
        updated: '2026-09-09',
        locales: {
            en: {
                path: '/privacy/',
                title: 'Privacy Policy',
                navLabel: 'Privacy Policy',
                description: 'What data this website processes, why, and how long we keep it: which cookies are set, how Google Analytics runs only with your consent, and how to withdraw it — plus your rights under the GDPR.',
            },
            de: {
                path: '/de/datenschutz/',
                title: 'Datenschutzerklärung',
                navLabel: 'Datenschutz',
                description: 'Welche Daten diese Website verarbeitet, auf welcher Rechtsgrundlage und wie lange: welche Cookies gesetzt werden, wie Google Analytics ausschließlich nach Ihrer Einwilligung läuft und wie Sie diese widerrufen — und Ihre Rechte nach der DSGVO.',
            },
        },
    },
    terms: {
        id: 'terms',
        updated: '2026-09-04',
        locales: {
            en: {
                path: '/terms/',
                title: 'Terms of Service',
                navLabel: 'Terms of Service',
                description: 'The terms covering use of polluxdev.com, how a contract for custom Shopify work comes about, and how our Shopify App Store apps are governed.',
            },
            de: {
                path: '/de/agb/',
                title: 'Allgemeine Geschäftsbedingungen',
                navLabel: 'AGB',
                description: 'Bedingungen für die Nutzung von polluxdev.com, das Zustandekommen von Verträgen über individuelle Shopify-Entwicklung und die Nutzung unserer Shopify-Apps.',
            },
        },
    },
};
/** Document order — footer, and any future legal index, follow this. */
export const legalOrder = [...legalDocIds];
/** The footer's legal row, in one locale. */
export function legalNav(locale = defaultLocale) {
    return legalOrder.map((id) => ({
        label: legalDocs[id].locales[locale].navLabel,
        href: legalDocs[id].locales[locale].path,
    }));
}
/**
 * Astro serves a locale-prefixed error route when one exists — a request under
 * /de that matches nothing renders /de/404, everything else /404 — which is why
 * this registry has two rows rather than one.
 */
export const notFoundRoutes = {
    en: {
        path: '/404',
        title: 'Page not found',
        description: 'That address does not lead anywhere on this site. Go back to the homepage, or tell us what you were trying to reach.',
    },
    de: {
        path: '/de/404',
        title: 'Seite nicht gefunden',
        description: 'Diese Adresse führt auf dieser Website ins Leere. Zurück zur Startseite — oder sagen Sie uns, wonach Sie gesucht haben.',
    },
};
