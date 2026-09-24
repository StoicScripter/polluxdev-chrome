/**
 * A tagged template for building markup as strings, with escaping on by default.
 *
 * Every interpolated value is escaped unless it is itself the result of `html`
 * (or `raw`), so a nav label carrying `&` or `'` — "Private Apps &
 * Integrations", "what's missing" — can never break an attribute or open a tag.
 * Arrays are flattened, and `null`, `undefined` and `false` render nothing, which
 * is what lets a renderer write `${cond && html`…`}` the way JSX would.
 */
export declare class SafeHtml {
    readonly value: string;
    constructor(value: string);
    toString(): string;
}
type Value = SafeHtml | string | number | boolean | null | undefined | Value[];
export declare function escape(value: string): string;
export declare function html(strings: TemplateStringsArray, ...values: Value[]): SafeHtml;
/** Trusted markup that must not be escaped — inline SVG paths, for instance. */
export declare function raw(value: string): SafeHtml;
/**
 * An attribute that is present only when it has a value — Astro's
 * `aria-current={x ? 'true' : undefined}`. Renders with a leading space.
 */
export declare function attr(name: string, value: string | null | undefined | false): SafeHtml;
export {};
