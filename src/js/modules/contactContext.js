import { t, onLanguageChange } from './languageSwitch';

const WHATSAPP_SELECTOR = '.contact a[href*="wa.me"], .floating-contact a[href*="wa.me"]';

const applyWhatsappContext = () => {
	const params = new URLSearchParams(window.location.search);
	const slug = params.get('servicio');
	if (!slug) return;

	const message = t(`contact.contextMessages.${slug}`);
	if (typeof message !== 'string' || !message) return;

	document.querySelectorAll(WHATSAPP_SELECTOR).forEach((link) => {
		try {
			const url = new URL(link.href);
			url.searchParams.set('text', message);
			link.setAttribute('href', url.toString());
		} catch {
			// ignore malformed hrefs
		}
	});
};

const contactContext = () => {
	if (document.body.dataset.contactContextReady === 'true') return;

	applyWhatsappContext();
	onLanguageChange(applyWhatsappContext);
	document.body.dataset.contactContextReady = 'true';
};

export default contactContext;
