/**
 * Single source of truth for navigation, footer and shared marketing strings.
 *
 * CLAUDE.md §6: the three service descriptions are used by the nav cards, the
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
 * that means /contact, the blog index and the three legal documents, which come
 * from their own registries (./routes.ts); the service and app routes are
 * English-only until those pages are built in German, so a German label pointing
 * at an English path is deliberate, not an oversight. The posts themselves stay
 * English even from the German index — there is only one of each.
 *
 * Moved here from the site's src/data/site.ts so the Dropby demo can draw the
 * same header and footer. The site re-exports everything from this module; the
 * drift guard between `services` and the contact form's project-focus options
 * now lives beside those options, in the site's src/data/contact.ts.
 */
import { defaultLocale } from '../i18n/config.js';
import { blogPath, blogRoutes, contactPath, contactRoutes, legalNav } from './routes.js';
export const site = {
    name: 'pollux|dev',
    /** The live site. Anything drawing the chrome on another origin prefixes its links with this. */
    origin: 'https://polluxdev.com',
    /** Footer positioning line, under the wordmark. */
    positioning: {
        en: 'Custom Shopify engineering — private apps, checkout logic, integrations and automations. Built and supported by two engineers.',
        de: 'Individuelle Shopify-Entwicklung — private Apps, Checkout-Logik, Integrationen und Automatisierungen. Gebaut und betreut von zwei Entwicklern.',
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
 * type. The site's src/data/contact.ts asserts against `ServiceSlug` that the
 * contact form's project-focus dropdown offers every service here, so adding a
 * service without adding the option is a compile error there.
 */
export const services = [
    {
        slug: 'private-apps-integrations',
        label: {
            en: 'Private Apps & Integrations',
            de: 'Private Apps & Integrationen',
        },
        href: '/services/private-apps-integrations',
        description: {
            en: 'Custom-built admin dashboards, ERP connections, and bespoke logic that replace clunky, off-the-shelf apps.',
            de: 'Eigene Admin-Oberflächen, ERP-Anbindungen und passgenaue Logik, die sperrige Standard-Apps ersetzen.',
        },
    },
    {
        slug: 'checkout-customization',
        label: {
            en: 'Checkout Customization',
            de: 'Checkout-Anpassung',
        },
        href: '/services/checkout-customization',
        description: {
            en: 'Shopify Functions, checkout extensions and pricing rules that make checkout do what your business actually needs.',
            de: 'Shopify Functions, Checkout-Erweiterungen und Preisregeln, damit der Checkout genau das tut, was Ihr Geschäft braucht.',
        },
    },
    {
        slug: 'workflow-automations',
        label: {
            en: 'Workflow Automations',
            de: 'Automatisierte Abläufe',
        },
        href: '/services/workflow-automations',
        description: {
            en: 'The manual jobs your team repeats every day — orders, stock, fulfilment, reporting — handled automatically.',
            de: 'Die Handgriffe, die Ihr Team täglich wiederholt — Bestellungen, Bestand, Versand, Auswertungen — laufen von selbst.',
        },
    },
];
/** The three services, resolved for the language drawn. The only path from `services` to a component. */
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
