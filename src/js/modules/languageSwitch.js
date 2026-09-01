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
};

const applyDocumentMeta = (lang) => {
	const title = translate(lang, 'site.meta.title');
	if (typeof title === 'string') document.title = title;

	const description = translate(lang, 'site.meta.description');
	const meta = document.querySelector('meta[name="description"]');
	if (typeof description === 'string' && meta) meta.setAttribute('content', description);

	const ogTitle = document.querySelector('meta[property="og:title"]');
	const ogDescription = document.querySelector('meta[property="og:description"]');
	if (typeof title === 'string' && ogTitle) ogTitle.setAttribute('content', title);
	if (typeof description === 'string' && ogDescription) {
		ogDescription.setAttribute('content', description);
	}

	document.documentElement.lang = lang;
	const ogLocale = document.querySelector('meta[property="og:locale"]');
	if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'es_CR');
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
