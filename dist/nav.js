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
const MOBILE_QUERY = '(max-width: 960px)';
export function initHeader(header) {
    if (header.hasAttribute('data-nav-ready'))
        return;
    header.setAttribute('data-nav-ready', '');
    const triggers = Array.from(header.querySelectorAll('[data-menu-trigger]'));
    const mobileToggle = header.querySelector('[data-mobile-toggle]');
    const mobile = window.matchMedia(MOBILE_QUERY);
    const navList = header.querySelector('[data-nav-list]');
    const rail = header.querySelector('[data-nav-rail]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panelFor = (id) => header.querySelector(`[data-menu-panel="${id}"]`);
    function setMenu(trigger, open) {
        const id = trigger.dataset.menuTrigger;
        if (!id)
            return;
        const panel = panelFor(id);
        if (!panel)
            return;
        trigger.setAttribute('aria-expanded', String(open));
        trigger.closest('[data-menu-item]')?.setAttribute('data-open', String(open));
        panel.hidden = !open;
    }
    /* ------------------------------------------------------------- the rail */
    /*
     * One teal line for the whole nav, parked under the section you are in and
     * travelling to whichever item the pointer is over. It replaces the static
     * per-item underline the CSS ships, and only once it has been measured:
     * `data-rail` on the header is the handover, so a page that never runs this
     * file still marks its active section.
     *
     * Desktop only. Inside the mobile panel the items are stacked rows with no
     * shared edge to travel along, so the static underline stays.
     */
    /** Pointer and keyboard are tracked apart: the pointer wins while both are set. */
    let hovered = null;
    let focused = null;
    const currentLabel = () => header.querySelector('[data-menu-trigger][aria-current="true"] [data-nav-label]');
    /** The label an item carries, or null for a nav item that owns no section. */
    const labelIn = (item) => item?.querySelector('[data-nav-label]') ?? null;
    /**
     * `animate: false` jumps instead of sliding — for the first placement and
     * for resizes, where a slide would be reporting a move that never happened.
     */
    function drawRail(animate = true) {
        if (!rail)
            return;
        if (mobile.matches) {
            header.removeAttribute('data-rail');
            return;
        }
        const target = hovered ?? focused ?? currentLabel();
        header.setAttribute('data-rail', '');
        // No section and nothing hovered: fade out where it stands rather than
        // collapsing to the left edge on the way.
        if (!target) {
            rail.style.opacity = '0';
            return;
        }
        const box = target.getBoundingClientRect();
        const origin = header.getBoundingClientRect();
        if (!animate || reducedMotion.matches)
            rail.style.transition = 'none';
        rail.style.transform = `translateX(${box.left - origin.left}px) scaleX(${box.width})`;
        rail.style.opacity = '1';
        if (!animate || reducedMotion.matches) {
            // Applied with the transition suppressed, restored for the next move.
            requestAnimationFrame(() => {
                rail.style.transition = '';
            });
        }
    }
    if (rail && navList) {
        /*
         * Delegated, and deliberately indifferent to the gaps between items: a
         * pointer crossing from Services to Apps passes over the list itself,
         * and snapping the line home for those few pixels would read as a
         * flicker rather than as a return.
         */
        navList.addEventListener('pointerover', (event) => {
            if (event.pointerType === 'touch')
                return;
            const item = event.target?.closest('[data-menu-item]');
            if (!item)
                return;
            hovered = labelIn(item);
            drawRail();
        });
        navList.addEventListener('pointerleave', () => {
            hovered = null;
            drawRail();
        });
        // Keyboard gets the same signal: tabbing the nav walks the line along.
        header.addEventListener('focusin', (event) => {
            const item = event.target?.closest('[data-menu-item]');
            focused = item ? labelIn(item) : null;
            drawRail();
        });
        header.addEventListener('focusout', (event) => {
            const next = event.relatedTarget;
            if (next && header.contains(next))
                return;
            focused = null;
            drawRail();
        });
        window.addEventListener('resize', () => drawRail(false));
        // Label widths move when the real faces land, and the line is measured
        // off those labels.
        document.fonts?.ready.then(() => drawRail(false));
        drawRail(false);
    }
    function closeMenus(except) {
        for (const trigger of triggers) {
            if (trigger !== except)
                setMenu(trigger, false);
        }
    }
    function setMobile(open) {
        if (!mobileToggle)
            return;
        // The hamburger styles itself off aria-expanded, so state lives there.
        mobileToggle.setAttribute('aria-expanded', String(open));
        header.toggleAttribute('data-mobile-open', open);
        document.documentElement.style.overflow = open ? 'hidden' : '';
        if (!open)
            closeMenus();
    }
    const isMobileOpen = () => header.hasAttribute('data-mobile-open');
    for (const trigger of triggers) {
        trigger.addEventListener('click', () => {
            const open = trigger.getAttribute('aria-expanded') === 'true';
            closeMenus(trigger);
            setMenu(trigger, !open);
        });
    }
    mobileToggle?.addEventListener('click', () => {
        setMobile(!isMobileOpen());
    });
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape')
            return;
        const openTrigger = triggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true');
        if (openTrigger) {
            setMenu(openTrigger, false);
            openTrigger.focus();
            return;
        }
        if (isMobileOpen()) {
            setMobile(false);
            mobileToggle?.focus();
        }
    });
    // Clicking anywhere outside the header dismisses whatever is open.
    document.addEventListener('pointerdown', (event) => {
        const target = event.target;
        if (target && header.contains(target))
            return;
        closeMenus();
        if (isMobileOpen())
            setMobile(false);
    });
    // Tabbing out of the header closes the desktop dropdown.
    header.addEventListener('focusout', (event) => {
        if (mobile.matches)
            return;
        const next = event.relatedTarget;
        if (next && header.contains(next))
            return;
        closeMenus();
    });
    // Crossing the breakpoint resets everything rather than leaving a desktop
    // dropdown stranded inside the mobile panel, or vice versa.
    mobile.addEventListener('change', () => {
        closeMenus();
        setMobile(false);
        hovered = null;
        focused = null;
        drawRail(false);
    });
}
if (typeof document !== 'undefined') {
    const header = document.querySelector('[data-header]');
    if (header)
        initHeader(header);
}
