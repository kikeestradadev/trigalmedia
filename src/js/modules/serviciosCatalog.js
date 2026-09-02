const DESKTOP_QUERY = '(width >= 960px)';

const getButtons = (section) => [...section.querySelectorAll('.servicios-catalog__item-button')];

const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

const setExpanded = (button, expanded) => {
	const panelId = button.getAttribute('aria-controls');
	const panel = panelId ? document.getElementById(panelId) : null;
	button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
	if (panel) panel.hidden = !expanded;
};

const closeOthers = (section, current) => {
	getButtons(section).forEach((button) => {
		if (button !== current) setExpanded(button, false);
	});
};

const serviciosCatalog = () => {
	document.querySelectorAll('.servicios-catalog').forEach((root) => {
		if (root.dataset.serviciosCatalogReady === 'true') return;

		root.querySelectorAll('.servicios-catalog__section').forEach((section) => {
			const buttons = getButtons(section);

			buttons.forEach((button, index) => {
				button.addEventListener('click', () => {
					const expanded = button.getAttribute('aria-expanded') === 'true';
					if (isDesktop() && !expanded) closeOthers(section, button);
					setExpanded(button, !expanded);
				});

				button.addEventListener('keydown', (event) => {
					const { key } = event;
					if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;

					event.preventDefault();
					let nextIndex = index;
					if (key === 'ArrowDown') nextIndex = (index + 1) % buttons.length;
					if (key === 'ArrowUp') nextIndex = (index - 1 + buttons.length) % buttons.length;
					if (key === 'Home') nextIndex = 0;
					if (key === 'End') nextIndex = buttons.length - 1;
					buttons[nextIndex]?.focus();
				});
			});
		});

		root.dataset.serviciosCatalogReady = 'true';
	});
};

export default serviciosCatalog;
