import { t, onLanguageChange } from './languageSwitch';

const getFocusable = (root) =>
	[...root.querySelectorAll('a[href], button:not([disabled])')].filter(
		(el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true'
	);

const siteHeader = () => {
	document.querySelectorAll('.site-header').forEach((root) => {
		if (root.dataset.siteHeaderReady === 'true') return;

		const toggle = root.querySelector('.site-header__toggle');
		const panel = root.querySelector('.site-header__panel');
		const label = toggle?.querySelector('.visually-hidden');
		if (!toggle || !panel) return;

		const setExpandedLabel = (expanded) => {
			const key = expanded ? 'siteHeader.menuClose' : 'siteHeader.menuOpen';
			const text = t(key);
			toggle.setAttribute('data-i18n-aria', key);
			if (label) {
				label.setAttribute('data-i18n', key);
				if (text) label.textContent = text;
			}
			if (text) toggle.setAttribute('aria-label', text);
		};

		const close = () => {
			toggle.setAttribute('aria-expanded', 'false');
			panel.hidden = true;
			document.body.classList.remove('is-nav-open');
			setExpandedLabel(false);
		};

		const open = () => {
			toggle.setAttribute('aria-expanded', 'true');
			panel.hidden = false;
			document.body.classList.add('is-nav-open');
			setExpandedLabel(true);
			const focusable = getFocusable(panel);
			if (focusable[0]) focusable[0].focus();
		};

		const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

		toggle.addEventListener('click', () => {
			if (isOpen()) close();
			else open();
		});

		root.querySelectorAll('.site-header__panel-link, .site-header__panel-cta').forEach((link) => {
			link.addEventListener('click', () => close());
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && isOpen()) {
				close();
				toggle.focus();
			}

			if (event.key !== 'Tab' || !isOpen()) return;

			const focusable = getFocusable(panel);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});

		onLanguageChange(() => {
			setExpandedLabel(isOpen());
		});

		close();
		root.dataset.siteHeaderReady = 'true';
	});
};

export default siteHeader;
