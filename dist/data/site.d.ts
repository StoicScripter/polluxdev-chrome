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
import { type Locale } from '../i18n/config.js';
import { type ServiceSlug } from './routes.js';
/** A string in every language the site speaks. */
export type Localized = Record<Locale, string>;
export interface NavLink {
    label: Localized;
    href: string;
}
export interface NavCard extends NavLink {
    description: Localized;
    /**
     * A shortcut into another menu's territory. It still links, but it never
     * claims the header's active-section underline: /contact belongs to Company
     * however many other menus offer a way to reach it.
     */
    crossLink?: boolean;
}
export interface Service extends NavCard {
    slug: string;
}
export interface App {
    slug: string;
    /** A product name, so it is the same word in every language. */
    name: string;
    href: string;
    description: Localized;
    /** Only `live` apps may appear in navigation or be called installable. */
    status: 'live' | 'unreleased';
    /** App Store listing. Only a `live` app has one — it is where installs start. */
    listingUrl?: string;
}
/** What a component receives: one language, resolved. */
export interface Link {
    label: string;
    href: string;
}
export interface Card extends Link {
    description: string;
    crossLink?: boolean;
}
export declare const site: {
    readonly name: "pollux|dev";
    /** The live site. Anything drawing the chrome on another origin prefixes its links with this. */
    readonly origin: "https://polluxdev.com";
    /** Footer positioning line, under the wordmark. */
    readonly positioning: {
        readonly en: "The Shopify engineering team for stores that have outgrown apps and themes. Two engineers, no account managers.";
        readonly de: "Das Shopify-Entwicklerteam für Shops, denen Apps und Themes nicht mehr reichen. Zwei Entwickler, keine Account-Manager.";
    };
    /** Bottom of the footer, after the year and the wordmark. The site's one emoji. */
    readonly madeIn: {
        readonly en: "Made with 🤍 in Germany";
        readonly de: "Mit 🤍 in Deutschland gebaut";
    };
    readonly email: "hello@polluxdev.com";
    readonly phone: "+49 176 53200526";
    readonly bookingUrl: string;
    /**
     * Cal.com event, as `user/event-slug`. Empty until the account exists: the
     * booking step then says so in words rather than mounting a dead calendar,
     * and Cal's script is never loaded. Set this one string and Step 2 goes live.
     */
    readonly calLink: "https://cal.com/tom-gottselich/30min";
    readonly youtube: "https://www.youtube.com/@pollux-dev";
    readonly linkedin: "https://www.linkedin.com/company/polluxdev";
    readonly shopify: "https://apps.shopify.com/partners/pollux4";
};
export declare const services: readonly [{
    readonly slug: "store-tech-audit";
    readonly label: {
        readonly en: "Store Tech Audit";
        readonly de: "Shop-Audit";
    };
    readonly href: "/services/store-tech-audit/";
    readonly description: {
        readonly en: "Five working days, a written report and a fixed price for every fix. Credited if you book the work.";
        readonly de: "Fünf Werktage, ein schriftlicher Bericht und ein Festpreis für jede Lösung. Wird bei Auftrag angerechnet.";
    };
}, {
    readonly slug: "checkout-discount-logic";
    readonly label: {
        readonly en: "Checkout & Discount Logic";
        readonly de: "Checkout- & Rabattlogik";
    };
    readonly href: "/services/checkout-discount-logic/";
    readonly description: {
        readonly en: "Pricing, discount, delivery and payment rules a discount code can’t express. For Shopify Plus.";
        readonly de: "Preis-, Rabatt-, Versand- und Zahlungsregeln, die kein Rabattcode abbildet. Für Shopify Plus.";
    };
}, {
    readonly slug: "integrations-automations";
    readonly label: {
        readonly en: "Integrations & Automations";
        readonly de: "Integrationen & Automatisierungen";
    };
    readonly href: "/services/integrations-automations/";
    readonly description: {
        readonly en: "Orders, stock, customers and prices in sync with your ERP, 3PL or accounting tool.";
        readonly de: "Bestellungen, Bestand, Kunden und Preise im Abgleich mit ERP, Fulfillment und Buchhaltung.";
    };
}, {
    readonly slug: "custom-apps";
    readonly label: {
        readonly en: "Custom Apps";
        readonly de: "Individuelle Apps";
    };
    readonly href: "/services/custom-apps/";
    readonly description: {
        readonly en: "One app built around how your team works — often replacing several you pay for every month.";
        readonly de: "Eine App für die Abläufe Ihres Teams — oft anstelle mehrerer, die Sie jeden Monat bezahlen.";
    };
}, {
    readonly slug: "fix-takeover";
    readonly label: {
        readonly en: "Fix & Takeover";
        readonly de: "Reparatur & Übernahme";
    };
    readonly href: "/services/fix-takeover/";
    readonly description: {
        readonly en: "An app or integration someone else built is broken or abandoned. We find out why, then repair or rebuild.";
        readonly de: "Eine App oder Anbindung von jemand anderem ist kaputt oder verwaist. Wir finden die Ursache und reparieren.";
    };
}];
/** A service in one language, as the menu, footer and homepage section draw it. */
export interface ResolvedService extends Card {
    slug: ServiceSlug;
}
/** The five services, resolved for the language drawn. The only path from `services` to a component. */
export declare function resolveServices(locale?: Locale): ResolvedService[];
export declare const apps: App[];
export declare const liveApps: App[];
export interface MegaMenu {
    id: string;
    label: string;
    cards: Card[];
}
/**
 * The header's three mega menus, in one language.
 *
 * `Tools` is deliberately absent: PRODUCT.md keeps /tools out of the build until
 * a real tool exists. It returns as a plain link beside these once one ships.
 */
export declare function menus(locale?: Locale): MegaMenu[];
/** The header's own call to action, beside the menus. */
export declare function headerCta(locale?: Locale): Link;
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
export declare function footer(locale?: Locale): {
    columns: Array<{
        heading: string;
        links: Link[];
    }>;
    languages: {
        heading: string;
    };
    legal: {
        heading: string;
        links: Link[];
    };
    /**
     * Only the heading. The social links each carry an inline brand mark, so
     * they stay in the renderer rather than being described here, and their
     * names are brands rather than words to translate.
     */
    social: {
        heading: string;
    };
};
