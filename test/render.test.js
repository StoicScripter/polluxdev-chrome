import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { renderFooter, renderHeader } from '../dist/index.js';

test('escapes copy that carries markup characters', () => {
	const header = renderHeader({ locale: 'en', path: '/' });
	assert.match(header, /Checkout &amp; Discount Logic/);
	assert.match(header, /Tell us what&#39;s missing/);
});

test('marks the section that owns the page, and only that one', () => {
	const header = renderHeader({ locale: 'en', path: '/apps/dropby-store-locator/' });
	assert.match(header, /data-menu-trigger="apps"[^>]*aria-current="true"/);
	assert.equal(header.match(/aria-current="true"/g)?.length, 2); // the trigger + the current language
});

test('hides the header CTA on the page it points at', () => {
	assert.doesNotMatch(renderHeader({ locale: 'en', path: '/contact/' }), /pc-cta/);
	assert.match(renderHeader({ locale: 'en', path: '/' }), /pc-cta/);
});

test('repeats the CTA at the foot of the nav panel, inside the nav', () => {
	const header = renderHeader({ locale: 'en', path: '/' });
	assert.match(header, /<\/ul><a class="pc-btn pc-btn-primary pc-cta-mobile" href="\/contact\/">Book a call<\/a><\/nav>/);
	assert.doesNotMatch(renderHeader({ locale: 'de', path: '/de/kontakt/' }), /pc-cta-mobile/);
});

test('prefixes site-absolute links with baseUrl, and leaves external ones alone', () => {
	const header = renderHeader({ locale: 'de', path: '/apps/dropby-store-locator/', baseUrl: 'https://polluxdev.com/' });
	assert.match(header, /href="https:\/\/polluxdev\.com\/de\/kontakt\/"/);
	assert.match(header, /class="pc-wordmark" href="https:\/\/polluxdev\.com\/"/);
	assert.doesNotMatch(header, /href="\/[^/]/);

	const footer = renderFooter({ locale: 'en', path: '/', baseUrl: 'https://polluxdev.com' });
	assert.match(footer, /href="https:\/\/www\.youtube\.com\/@pollux-dev"/);
	assert.match(footer, /href="https:\/\/polluxdev\.com\/privacy\/"/);
});

test('German chrome links services to German pages, and the picker pairs them', () => {
	const header = renderHeader({ locale: 'de', path: '/de/leistungen/shop-audit/' });
	assert.match(header, /href="\/de\/leistungen\/individuelle-apps\/"/);
	assert.doesNotMatch(header, /class="pc-card" href="\/services\//);
	assert.match(header, /data-menu-trigger="services"[^>]*aria-current="true"/);
	assert.match(header, /class="pc-lang-option" href="\/services\/store-tech-audit\/"/);

	const footer = renderFooter({ locale: 'de', path: '/de/leistungen/shop-audit/' });
	assert.match(footer, /href="\/de\/leistungen\/reparatur-uebernahme\/"/);
});

test('cookie settings control is opt-out', () => {
	assert.match(renderFooter({ path: '/' }), /data-cc="show-preferencesModal"/);
	assert.doesNotMatch(renderFooter({ path: '/', cookieSettings: false }), /data-cc=/);
});

/*
 * Structural parity with the Astro components this package replaces. Point
 * BASELINE_DIST at a copy of the site's dist/client built before the migration;
 * both sides are reduced to tags, text and non-class attributes, so a renamed
 * class is not a difference and anything else is.
 */
const baseline = process.env.BASELINE_DIST;

function normalise(markup) {
	return markup
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/ data-astro-cid-\w+(="[^"]*")?/g, '')
		.replace(/ class="[^"]*"/g, '')
		.replace(/ data-nav-list/g, '')
		.replace(/>\s+</g, '><')
		.replace(/\s+/g, ' ')
		.trim();
}

const pages = [
	{ file: 'index.html', path: '/', locale: 'en' },
	{ file: 'contact/index.html', path: '/contact/', locale: 'en' },
	{ file: 'de/kontakt/index.html', path: '/de/kontakt/', locale: 'de' },
	{ file: 'de/datenschutz/index.html', path: '/de/datenschutz/', locale: 'de' },
	{ file: 'apps/dropby-store-locator/index.html', path: '/apps/dropby-store-locator/', locale: 'en' },
	{ file: 'blog/index.html', path: '/blog/', locale: 'en' },
];

for (const page of pages) {
	test(`matches the Astro markup: ${page.file}`, { skip: !baseline && 'BASELINE_DIST not set' }, () => {
		const file = join(baseline, page.file);
		if (!existsSync(file)) return;
		const built = readFileSync(file, 'utf8');
		const year = Number(built.match(/© (\d{4})/)?.[1]);

		const header = built.match(/<header class="site-header"[\s\S]*?<\/header>/)[0];
		const footer = built.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)[0];

		assert.equal(
			normalise(renderHeader({ locale: page.locale, path: page.path })),
			normalise(header),
		);
		assert.equal(
			normalise(renderFooter({ locale: page.locale, path: page.path, year })),
			normalise(footer),
		);
	});
}
