const siteHeader = () => {
	document.querySelectorAll('.site-header').forEach((root) => {
		if (root.dataset.siteHeaderReady === 'true') return;
		root.dataset.siteHeaderReady = 'true';

		const toggle = root.querySelector('.site-header__toggle');
		const panel = root.querySelector('.site-header__panel');
		if (!toggle || !panel) return;

		const labelOpen = root.dataset.menuOpen || 'Open menu';
		const labelClose = root.dataset.menuClose || 'Close menu';

		const setOpen = (open) => {
			root.classList.toggle('site-header--open', open);
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			toggle.setAttribute('aria-label', open ? labelClose : labelOpen);
		};

		toggle.addEventListener('click', () => {
			setOpen(!root.classList.contains('site-header--open'));
		});

		root.querySelectorAll('.site-header__link, .site-header__cta, .site-header__lang-btn').forEach((link) => {
			link.addEventListener('click', () => setOpen(false));
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') setOpen(false);
		});
	});
};

export default siteHeader;
