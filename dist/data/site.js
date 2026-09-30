/**
 * Single source of truth for navigation, footer and shared marketing strings.
 *
 * CLAUDE.md §6: the service descriptions are used by the nav cards, the
 * footer, the homepage panel and each service page hero — they live here so
 * they cannot drift apart. Nothing in this file may be re-typed in a component.
 *
 * Every string a reader sees is a `Localized` record rather than a bare string,
 * so a missing translation is a build error rather than an English word on a
 * German page. Components never index those records themselves: the exported
 * builders below take a locale and hand back plain strings, which is what keeps
 * the header and footer renderers free of translation logic.
 *
 * Destinations are locale-invariant unless a real translated route exists. Today
 * that means /contact, the blog index, the five service pages and the three
 * legal documents, which come from their own registries (./routes.ts); the app
 * routes are English-only until those pages are built in German, so a German
 * label pointing at an English path is deliberate, not an oversight. The posts themselves stay
 * English even from the German index — there is only one of each.
 *
 * Moved here from the site's src/data/site.ts so the Dropby demo can draw the
 * same header and footer. The site re-exports everything from this module; the
 * drift guard between `services` and the contact form's project-focus options
 * now lives beside those options, in the site's src/data/contact.ts.
 */
import { defaultLocale } from '../i18n/config.js';
import { blogPath, blogRoutes, contactPath, contactRoutes, legalNav, serviceRoutes, serviceSlugs, servicePath, } from './routes.js';
export const site = {
    name: 'pollux|dev',
    /** The live site. Anything drawing the chrome on another origin prefixes its links with this. */
    origin: 'https://polluxdev.com',
    /** Footer positioning line, under the wordmark. */
    positioning: {
        en: 'The Shopify engineering team for stores that have outgrown apps and themes. Two engineers, no account managers.',
        de: 'Das Shopify-Entwicklerteam für Shops, denen Apps und Themes nicht mehr reichen. Zwei Entwickler, keine Account-Manager.',
    },
    /** Bottom of the footer, after the year and the wordmark. The site's one emoji. */
    madeIn: {
        en: 'Made with 🤍 in Germany',
        de: 'Mit 🤍 in Deutschland gebaut',
    },
    email: 'hello@polluxdev.com',
    phone: '+49 176 53200526',
    bookingUrl: contactPath(),
    /**
     * Cal.com event, as `user/event-slug`. Empty until the account exists: the
     * booking step then says so in words rather than mounting a dead calendar,
     * and Cal's script is never loaded. Set this one string and Step 2 goes live.
     */
    calLink: 'https://cal.com/tom-gottselich/30min',
    youtube: 'https://www.youtube.com/@pollux-dev',
    linkedin: 'https://www.linkedin.com/company/polluxdev',
    shopify: 'https://apps.shopify.com/partners/pollux4',
};
/* ------------------------------------------------------------- services */
/*
 * `satisfies` rather than a type annotation, so each slug keeps its literal
 * type. Slugs and paths come from `serviceRoutes` (./routes.ts); `href` is the
 * English path, and `translatedRoutes` below swaps in the German one. The
 * site's src/data/contact.ts asserts against `ServiceSlug` that the contact
 * form's project-focus dropdown offers every service here, so adding a service
 * without adding the option is a compile error there.
 *
 * Descriptions are sized for a mega-menu card: one or two short sentences.
 */
export const services = [
    {
        slug: 'store-tech-audit',
        label: {
            en: 'Store Tech Audit',
            de: 'Shop-Audit',
        },
        href: serviceRoutes['store-tech-audit'].en,
        description: {
            en: 'Five working days, a written report and a fixed price for every fix. Credited if you book the work.',
            de: 'Fünf Werktage, ein schriftlicher Bericht und ein Festpreis für jede Lösung. Wird bei Auftrag angerechnet.',
        },
    },
    {
        slug: 'checkout-discount-logic',
        label: {
            en: 'Checkout & Discount Logic',
            de: 'Checkout- & Rabattlogik',
        },
        href: serviceRoutes['checkout-discount-logic'].en,
        description: {
            en: 'Pricing, discount, delivery and payment rules a discount code can’t express. For Shopify Plus.',
            de: 'Preis-, Rabatt-, Versand- und Zahlungsregeln, die kein Rabattcode abbildet. Für Shopify Plus.',
        },
    },
    {
        slug: 'integrations-automations',
        label: {
            en: 'Integrations & Automations',
            de: 'Integrationen & Automatisierungen',
        },
        href: serviceRoutes['integrations-automations'].en,
        description: {
            en: 'Orders, stock, customers and prices in sync with your ERP, 3PL or accounting tool.',
            de: 'Bestellungen, Bestand, Kunden und Preise im Abgleich mit ERP, Fulfillment und Buchhaltung.',
        },
    },
    {
        slug: 'custom-apps',
        label: {
            en: 'Custom Apps',
            de: 'Individuelle Apps',
        },
        href: serviceRoutes['custom-apps'].en,
        description: {
            en: 'One app built around how your team works — often replacing several you pay for every month.',
            de: 'Eine App für die Abläufe Ihres Teams — oft anstelle mehrerer, die Sie jeden Monat bezahlen.',
        },
    },
    {
        slug: 'fix-takeover',
        label: {
            en: 'Fix & Takeover',
            de: 'Reparatur & Übernahme',
        },
        href: serviceRoutes['fix-takeover'].en,
        description: {
            en: 'An app or integration someone else built is broken or abandoned. We find out why, then repair or rebuild.',
            de: 'Eine App oder Anbindung von jemand anderem ist kaputt oder verwaist. Wir finden die Ursache und reparieren.',
        },
    },
];
/* Every registered route has a service, and so a card, a footer link and a stage. */
const everyRouteHasAService = true;
void everyRouteHasAService;
/** The five services, resolved for the language drawn. The only path from `services` to a component. */
export function resolveServices(locale = defaultLocale) {
    return services.map((service) => ({ slug: service.slug, ...card(service, locale) }));
}
/* ----------------------------------------------------------------- apps */
export const apps = [
    {
        slug: 'dropby',
        name: 'Dropby',
        href: '/apps/dropby-store-locator/',
        description: {
            en: 'Store locator for merchants selling through stockists and retail partners.',
            de: 'Händlersuche für Shops, die über Fachhändler und Handelspartner verkaufen.',
        },
        status: 'live',
        listingUrl: 'https://apps.shopify.com/pollux-store-locator',
    },
    {
        // Not public yet: never listed in nav, never described as installable.
        slug: 'thermoguard',
        name: 'ThermoGuard',
        href: '/apps/thermoguard/',
        description: {
            en: 'Protection for temperature-sensitive shipments.',
            de: 'Schutz für temperaturempfindliche Sendungen.',
        },
        status: 'unreleased',
    },
];
export const liveApps = apps.filter((app) => app.status === 'live');
/**
 * The routes that exist in more than one language. Everything else is written
 * once, in English, because that is the only version of the page there is; add
 * a route here the day it gets a translated sibling and every menu and footer
 * link to it follows.
 */
const translatedRoutes = {
    [contactRoutes.en.path]: contactPath,
    [blogRoutes.en.path]: blogPath,
    ...Object.fromEntries(serviceSlugs.map((slug) => [serviceRoutes[slug].en, (locale) => servicePath(slug, locale)])),
};
const href = (path, locale) => translatedRoutes[path]?.(locale) ?? path;
/** Resolves a card's localized strings and destination for the language drawn. */
function card(source, locale) {
    return {
        label: source.label[locale],
        href: href(source.href, locale),
        description: source.description[locale],
        ...(source.crossLink ? { crossLink: true } : {}),
    };
}
const menuLabels = {
    services: { en: 'Services', de: 'Leistungen' },
    apps: { en: 'Apps', de: 'Apps' },
    company: { en: 'Company', de: 'Unternehmen' },
};
const appsCards = [
    ...liveApps.map((app) => ({
        label: { en: app.name, de: app.name },
        href: app.href,
        description: app.description,
    })),
    {
        label: { en: 'App documentation', de: 'App-Dokumentation' },
        href: '/apps/dropby-store-locator/docs/',
        description: {
            en: 'Setup guides, configuration reference and troubleshooting for every app we publish.',
            de: 'Einrichtung, Konfiguration und Hilfe bei Problemen — für jede App, die wir veröffentlichen.',
        },
    },
    {
        label: { en: 'Request a feature', de: 'Funktion vorschlagen' },
        href: contactPath(),
        description: {
            en: "Tell us what's missing and we'll scope it as a custom extension.",
            de: 'Sagen Sie uns, was fehlt — wir schätzen es als Erweiterung für Sie ein.',
        },
        crossLink: true,
    },
];
const companyCards = [
    {
        label: { en: 'About', de: 'Über uns' },
        href: '/about',
        description: {
            en: 'Who we are, how we work, and why there is no account manager between us.',
            de: 'Wer wir sind, wie wir arbeiten und warum zwischen uns kein Account-Manager sitzt.',
        },
    },
    {
        label: { en: 'Blog', de: 'Blog' },
        href: blogPath(),
        description: {
            en: 'What we learn building on Shopify, written for merchants rather than developers.',
            de: 'Was wir beim Bauen auf Shopify lernen — geschrieben für Händler, nicht für Entwickler.',
        },
    },
    {
        label: { en: contactRoutes.en.navLabel, de: contactRoutes.de.navLabel },
        href: contactPath(),
        description: {
            en: 'Send the requirement in plain language and get an honest answer on feasibility.',
            de: 'Beschreiben Sie die Aufgabe in klaren Worten und erhalten Sie eine ehrliche Einschätzung.',
        },
    },
];
/**
 * The header's three mega menus, in one language.
 *
 * `Tools` is deliberately absent: PRODUCT.md keeps /tools out of the build until
 * a real tool exists. It returns as a plain link beside these once one ships.
 */
export function menus(locale = defaultLocale) {
    return [
        {
            id: 'services',
            label: menuLabels.services[locale],
            cards: resolveServices(locale).map(({ slug, ...service }) => service),
        },
        {
            id: 'apps',
            label: menuLabels.apps[locale],
            cards: appsCards.map((source) => card(source, locale)),
        },
        {
            id: 'company',
            label: menuLabels.company[locale],
            cards: companyCards.map((source) => card(source, locale)),
        },
    ];
}
/** The header's own call to action, beside the menus. */
export function headerCta(locale = defaultLocale) {
    return {
        label: { en: 'Book a call', de: 'Termin buchen' }[locale],
        href: contactPath(locale),
    };
}
/* --------------------------------------------------------------- footer */
const footerHeadings = {
    services: { en: 'Services', de: 'Leistungen' },
    company: { en: 'Company', de: 'Unternehmen' },
    languages: { en: 'Languages', de: 'Sprachen' },
    legal: { en: 'Legal', de: 'Rechtliches' },
    social: { en: 'Social', de: 'Social Media' },
};
const companyLinks = [
    { label: { en: 'About', de: 'Über uns' }, href: '/about' },
    { label: { en: 'Our apps', de: 'Unsere Apps' }, href: '/apps/' },
    { label: { en: 'Blog', de: 'Blog' }, href: blogPath() },
    { label: { en: 'App docs', de: 'App-Dokumentation' }, href: '/apps/dropby-store-locator/docs/' },
    { label: { en: 'How we work', de: 'So arbeiten wir' }, href: '/#how-we-work' },
    { label: { en: 'FAQ', de: 'Häufige Fragen' }, href: '/#faq' },
    { label: { en: contactRoutes.en.navLabel, de: contactRoutes.de.navLabel }, href: contactPath() },
];
/**
 * The footer, in one language.
 *
 * The Languages column is only a heading: its links are the same page in the
 * other language, which depends on the page being drawn, so the footer renderer
 * builds them from ../i18n/routes.ts — the registry the header's picker reads,
 * so the two can never offer different destinations.
 *
 * The legal row is derived, never re-typed: ./routes.ts owns the slugs and the
 * labels, so a German route rename cannot leave a dead link down here.
 */
export function footer(locale = defaultLocale) {
    return {
        columns: [
            {
                heading: footerHeadings.services[locale],
                links: resolveServices(locale).map(({ label, href }) => ({ label, href })),
            },
            {
                heading: footerHeadings.company[locale],
                links: companyLinks.map((link) => ({
                    label: link.label[locale],
                    href: href(link.href, locale),
                })),
            },
        ],
        languages: {
            heading: footerHeadings.languages[locale],
        },
        legal: {
            heading: footerHeadings.legal[locale],
            links: legalNav(locale),
        },
        /**
         * Only the heading. The social links each carry an inline brand mark, so
         * they stay in the renderer rather than being described here, and their
         * names are brands rather than words to translate.
         */
        social: {
            heading: footerHeadings.social[locale],
        },
    };
}
