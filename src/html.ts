/**
 * A tagged template for building markup as strings, with escaping on by default.
 *
 * Every interpolated value is escaped unless it is itself the result of `html`
 * (or `raw`), so a nav label carrying `&` or `'` — "Private Apps &
 * Integrations", "what's missing" — can never break an attribute or open a tag.
 * Arrays are flattened, and `null`, `undefined` and `false` render nothing, which
 * is what lets a renderer write `${cond && html`…`}` the way JSX would.
 */

export class SafeHtml {
	constructor(readonly value: string) {}

	toString(): string {
		return this.value;
	}
}

type Value = SafeHtml | string | number | boolean | null | undefined | Value[];

const ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

export function escape(value: string): string {
	return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

function render(value: Value): string {
	if (value === null || value === undefined || value === false) return '';
	if (value instanceof SafeHtml) return value.value;
	if (Array.isArray(value)) return value.map(render).join('');
	return escape(String(value));
}

export function html(strings: TemplateStringsArray, ...values: Value[]): SafeHtml {
	let out = strings[0];
	for (let i = 0; i < values.length; i++) {
		out += render(values[i]) + strings[i + 1];
	}
	return new SafeHtml(out);
}

/** Trusted markup that must not be escaped — inline SVG paths, for instance. */
export function raw(value: string): SafeHtml {
	return new SafeHtml(value);
}

/**
 * An attribute that is present only when it has a value — Astro's
 * `aria-current={x ? 'true' : undefined}`. Renders with a leading space.
 */
export function attr(name: string, value: string | null | undefined | false): SafeHtml {
	if (value === null || value === undefined || value === false) return new SafeHtml('');
	return new SafeHtml(` ${name}="${escape(value)}"`);
}
