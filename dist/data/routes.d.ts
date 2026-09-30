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
import { type Locale } from '../i18n/config.js';
export interface ContactRoute {
    /** Site-absolute path, with the trailing slash Astro's directory build serves. */
    path: string;
    /** Page metadata title. The h1 is separate copy — see the site's `contactCopy`. */
    title: string;
    /** Short form for nav and footer links. */
    navLabel: string;
    description: string;
}
export declare const contactRoutes: Record<Locale, ContactRoute>;
export declare function contactPath(locale?: Locale): string;
/**
 * The five service pages. Only the paths live here — the chrome links to them —
 * while each page's copy and metadata stay in the site (src/data/services.ts).
 * The order is the order the menu, footer and homepage section draw them in:
 * the audit first, because it is the entry offer.
 *
 * German pages carry German slugs under /de/leistungen/.
 */
export declare const serviceRoutes: {
    readonly 'store-tech-audit': {
        readonly en: "/services/store-tech-audit/";
        readonly de: "/de/leistungen/shop-audit/";
    };
    readonly 'checkout-discount-logic': {
        readonly en: "/services/checkout-discount-logic/";
        readonly de: "/de/leistungen/checkout-rabattlogik/";
    };
    readonly 'integrations-automations': {
        readonly en: "/services/integrations-automations/";
        readonly de: "/de/leistungen/integrationen-automatisierungen/";
    };
    readonly 'custom-apps': {
        readonly en: "/services/custom-apps/";
        readonly de: "/de/leistungen/individuelle-apps/";
    };
    readonly 'fix-takeover': {
        readonly en: "/services/fix-takeover/";
        readonly de: "/de/leistungen/reparatur-uebernahme/";
    };
};
export type ServiceSlug = keyof typeof serviceRoutes;
export declare const serviceSlugs: ServiceSlug[];
export declare function servicePath(slug: ServiceSlug, locale?: Locale): string;
export interface BlogRoute {
    /** Trailing slashes throughout: the build writes directories, not .html files. */
    path: string;
    title: string;
    description: string;
}
/**
 * The index exists twice — /blog/ and /de/blog/ — but a post exists once, in
 * English, at /blog/<slug>/ (the site's `postPath`).
 */
export declare const blogRoutes: Record<Locale, BlogRoute>;
export declare function blogPath(locale?: Locale): string;
export declare const legalDocIds: readonly ["legal-notice", "privacy", "terms"];
export type LegalDocId = (typeof legalDocIds)[number];
export interface LegalDocLocale {
    /**
     * Site-absolute path, with the trailing slash Astro's directory build format
     * actually serves. canonical, hreflang and the footer link all read this, so
     * they cannot disagree with the URL the page is reachable at.
     *
     * German documents carry German slugs, not translations of the English ones.
     */
    path: string;
    /** Both the <title> and the page h1 — deliberately the same string. */
    title: string;
    /** Short form for the footer and the language switch, where the full title is too long. */
    navLabel: string;
    description: string;
}
export interface LegalDoc {
    id: LegalDocId;
    /**
     * ISO date of the last substantive change, rendered in the reader's locale.
     * One date per document, not per translation: the translations say the same
     * thing, so they were last changed on the same day.
     */
    updated: string;
    locales: Record<Locale, LegalDocLocale>;
}
/**
 * Registry for the three legal documents. Body copy is NOT here — it is page
 * content and lives in the site's .astro pages, one per document per locale.
 *
 * CLAUDE.md §7: metadata on these pages is content, not boilerplate.
 */
export declare const legalDocs: Record<LegalDocId, LegalDoc>;
/** Document order — footer, and any future legal index, follow this. */
export declare const legalOrder: LegalDocId[];
/** The footer's legal row, in one locale. */
export declare function legalNav(locale?: Locale): {
    label: string;
    href: string;
}[];
export interface NotFoundRoute {
    /** Site-absolute path. Astro writes the error route as 404.html either way. */
    path: string;
    title: string;
    description: string;
}
/**
 * Astro serves a locale-prefixed error route when one exists — a request under
 * /de that matches nothing renders /de/404, everything else /404 — which is why
 * this registry has two rows rather than one.
 */
export declare const notFoundRoutes: Record<Locale, NotFoundRoute>;
