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
import { type Locale } from '../i18n/config.js';
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
        readonly en: "Custom Shopify engineering — private apps, checkout logic, integrations and automations. Built and supported by two engineers.";
        readonly de: "Individuelle Shopify-Entwicklung — private Apps, Checkout-Logik, Integrationen und Automatisierungen. Gebaut und betreut von zwei Entwicklern.";
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
    readonly slug: "private-apps-integrations";
    readonly label: {
        readonly en: "Private Apps & Integrations";
        readonly de: "Private Apps & Integrationen";
    };
    readonly href: "/services/private-apps-integrations";
    readonly description: {
        readonly en: "Custom-built admin dashboards, ERP connections, and bespoke logic that replace clunky, off-the-shelf apps.";
        readonly de: "Eigene Admin-Oberflächen, ERP-Anbindungen und passgenaue Logik, die sperrige Standard-Apps ersetzen.";
    };
}, {
    readonly slug: "checkout-customization";
    readonly label: {
        readonly en: "Checkout Customization";
        readonly de: "Checkout-Anpassung";
    };
    readonly href: "/services/checkout-customization";
    readonly description: {
        readonly en: "Shopify Functions, checkout extensions and pricing rules that make checkout do what your business actually needs.";
        readonly de: "Shopify Functions, Checkout-Erweiterungen und Preisregeln, damit der Checkout genau das tut, was Ihr Geschäft braucht.";
    };
}, {
    readonly slug: "workflow-automations";
    readonly label: {
        readonly en: "Workflow Automations";
        readonly de: "Automatisierte Abläufe";
    };
    readonly href: "/services/workflow-automations";
    readonly description: {
        readonly en: "The manual jobs your team repeats every day — orders, stock, fulfilment, reporting — handled automatically.";
        readonly de: "Die Handgriffe, die Ihr Team täglich wiederholt — Bestellungen, Bestand, Versand, Auswertungen — laufen von selbst.";
    };
}];
export type ServiceSlug = (typeof services)[number]['slug'];
/** A service in one language, as the menu, footer and homepage section draw it. */
export interface ResolvedService extends Card {
    slug: ServiceSlug;
}
/** The three services, resolved for the language drawn. The only path from `services` to a component. */
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
