import { t, onLanguageChange } from './languageSwitch';

const getFocusable = (root) =>
	[...root.querySelectorAll('a[href], button:not([disabled])')].filter(
		(el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true'
	);

const siteHeader = () => {
	document.querySelectorAll('.site-header').forEach((root) => {
		if (root.dataset.siteHeaderReady === 'true') return;

		const toggle = root.querySelector('.site-header__toggle');
		const overlay = root.querySelector('.site-header__overlay');
		const panel = root.querySelector('.site-header__panel');
		const label = toggle?.querySelector('.visually-hidden');
		if (!toggle || !overlay || !panel) return;

		const hideNavLayers = () => {
			panel.hidden = true;
			overlay.hidden = true;
		};

		const showNavLayers = () => {
			panel.hidden = false;
			overlay.hidden = false;
		};

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

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let closeTransitionHandler = null;

		const clearCloseTransition = () => {
			if (!closeTransitionHandler) return;
			panel.removeEventListener('transitionend', closeTransitionHandler);
			closeTransitionHandler = null;
		};

		const close = () => {
			toggle.setAttribute('aria-expanded', 'false');
			document.body.classList.remove('is-nav-open');
			setExpandedLabel(false);
			clearCloseTransition();

			if (prefersReducedMotion) {
				hideNavLayers();
				return;
			}

			closeTransitionHandler = (event) => {
				if (event.target !== panel || event.propertyName !== 'transform') return;
				clearCloseTransition();
				hideNavLayers();
			};

			panel.addEventListener('transitionend', closeTransitionHandler);
		};

		const open = () => {
			clearCloseTransition();
			toggle.setAttribute('aria-expanded', 'true');
			showNavLayers();
			setExpandedLabel(true);

			if (prefersReducedMotion) {
				document.body.classList.add('is-nav-open');
			} else {
				requestAnimationFrame(() => {
					document.body.classList.add('is-nav-open');
				});
			}

			const focusable = getFocusable(panel);
			if (focusable[0]) focusable[0].focus();
		};

		const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

		toggle.addEventListener('click', () => {
			if (isOpen()) close();
			else open();
		});

		overlay.addEventListener('click', () => {
			if (isOpen()) close();
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

		const currentPath = (window.location.pathname.replace(/\/+$/, '') || '/').replace(
			/\.html$/,
			''
		);
		const isServiciosPage = currentPath === '/servicios';
		root.querySelectorAll('.site-header__link, .site-header__panel-link').forEach((link) => {
			const hrefPath = (link.getAttribute('href') || '').split('#')[0].replace(/\.html$/, '');
			if (isServiciosPage && hrefPath === '/servicios') {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});

		root.dataset.siteHeaderReady = 'true';
	});
};

export default siteHeader;
