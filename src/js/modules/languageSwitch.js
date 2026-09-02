const STORAGE_KEY = 'trigal-lang';
const DEFAULT_LANG = 'es';

let bundle = null;
let currentLang = DEFAULT_LANG;
const listeners = [];

const getByPath = (obj, path) => {
	if (!path) return obj;
	return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
};

const readBundle = () => {
	if (bundle) return bundle;
	const node = document.getElementById('i18n-bundle');
	if (!node) return null;
	try {
		bundle = JSON.parse(node.textContent || '{}');
	} catch {
		bundle = null;
	}
	return bundle;
};

const translate = (lang, path) => {
	const data = readBundle();
	if (!data || !path) return undefined;
	const [source, ...rest] = path.split('.');
	return getByPath(data[source]?.[lang], rest.join('.'));
};

const applyText = (lang) => {
	document.querySelectorAll('[data-i18n]').forEach((el) => {
		const value = translate(lang, el.getAttribute('data-i18n'));
		if (typeof value === 'string') el.textContent = value;
	});

	document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
		const value = translate(lang, el.getAttribute('data-i18n-aria'));
		if (typeof value === 'string') el.setAttribute('aria-label', value);
	});

	document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
		const value = translate(lang, el.getAttribute('data-i18n-alt'));
		if (typeof value === 'string') el.setAttribute('alt', value);
	});

	document.querySelectorAll('[data-i18n-title]').forEach((el) => {
		const value = translate(lang, el.getAttribute('data-i18n-title'));
		if (typeof value === 'string') el.setAttribute('title', value);
	});

	document.querySelectorAll('[data-i18n-href]').forEach((el) => {
		const value = translate(lang, el.getAttribute('data-i18n-href'));
		if (typeof value === 'string') el.setAttribute('href', value);
	});
};

const applyDocumentMeta = (lang) => {
	const metaRoot = document.body.getAttribute('data-i18n-meta') || 'site.meta';
	const title = translate(lang, `${metaRoot}.title`);
	if (typeof title === 'string') document.title = title;

	const description = translate(lang, `${metaRoot}.description`);
	const meta = document.querySelector('meta[name="description"]');
	if (typeof description === 'string' && meta) meta.setAttribute('content', description);

	const keywords = translate(lang, `${metaRoot}.keywords`);
	const keywordsMeta = document.querySelector('meta[name="keywords"]');
	if (typeof keywords === 'string' && keywordsMeta) keywordsMeta.setAttribute('content', keywords);

	const ogImageAlt =
		translate(lang, `${metaRoot}.ogImageAlt`) || translate(lang, 'site.meta.ogImageAlt');
	const ogTitle = document.querySelector('meta[property="og:title"]');
	const ogDescription = document.querySelector('meta[property="og:description"]');
	const ogImageAltMeta = document.querySelector('meta[property="og:image:alt"]');
	const twitterTitle = document.querySelector('meta[name="twitter:title"]');
	const twitterDescription = document.querySelector('meta[name="twitter:description"]');
	const twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');

	if (typeof title === 'string' && ogTitle) ogTitle.setAttribute('content', title);
	if (typeof description === 'string' && ogDescription) {
		ogDescription.setAttribute('content', description);
	}
	if (typeof title === 'string' && twitterTitle) twitterTitle.setAttribute('content', title);
	if (typeof description === 'string' && twitterDescription) {
		twitterDescription.setAttribute('content', description);
	}
	if (typeof ogImageAlt === 'string' && ogImageAltMeta) {
		ogImageAltMeta.setAttribute('content', ogImageAlt);
	}
	if (typeof ogImageAlt === 'string' && twitterImageAlt) {
		twitterImageAlt.setAttribute('content', ogImageAlt);
	}

	document.documentElement.lang = lang === 'en' ? 'en-US' : 'es-CR';
	const ogLocale = document.querySelector('meta[property="og:locale"]');
	const ogLocaleAlternate = document.querySelector('meta[property="og:locale:alternate"]');
	if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'es_CR');
	if (ogLocaleAlternate) {
		ogLocaleAlternate.setAttribute('content', lang === 'en' ? 'es_CR' : 'en_US');
	}
};

const syncButtons = (lang) => {
	document.querySelectorAll('[data-lang]').forEach((button) => {
		const isActive = button.getAttribute('data-lang') === lang;
		button.classList.toggle('is-active', isActive);
		button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	});
};

const setLanguage = (lang) => {
	const next = lang === 'en' ? 'en' : DEFAULT_LANG;
	if (!readBundle()) return;

	currentLang = next;
	applyText(next);
	applyDocumentMeta(next);
	syncButtons(next);

	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		// ignore private mode
	}

	listeners.forEach((listener) => listener(next));
};

const languageSwitch = () => {
	document.documentElement.classList.remove('no-js');
	if (!readBundle()) return;

	document.querySelectorAll('[data-lang]').forEach((button) => {
		if (button.dataset.languageSwitchReady === 'true') return;

		button.addEventListener('click', () => {
			setLanguage(button.getAttribute('data-lang'));
		});

		button.dataset.languageSwitchReady = 'true';
	});

	let stored = DEFAULT_LANG;
	try {
		stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
	} catch {
		stored = DEFAULT_LANG;
	}

	setLanguage(stored);
};

export const getLang = () => currentLang;
export const t = (path) => translate(currentLang, path);
export const onLanguageChange = (listener) => {
	listeners.push(listener);
};

export default languageSwitch;
