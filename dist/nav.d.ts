/**
 * Header navigation behaviour.
 *
 * Progressive enhancement: the markup ships with every menu closed and no
 * dependency on this file for layout. Menus open on click (never hover), one at
 * a time, and always report state through `aria-expanded`.
 *
 * Moved here from the site's src/scripts/nav.ts. Importing the module drives the
 * page's `[data-header]` on its own; `initHeader` is exported for a page that
 * inserts a header later. A header is only ever wired once.
 */
export declare function initHeader(header: HTMLElement): void;
