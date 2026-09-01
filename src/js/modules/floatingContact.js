import { t, onLanguageChange } from './languageSwitch';

const getFocusable = (root) =>
	[...root.querySelectorAll('a[href], button:not([disabled])')].filter(
		(el) => !el.hasAttribute('hidden')
	);

const floatingContact = () => {
	document.querySelectorAll('.floating-contact').forEach((root) => {
		if (root.dataset.floatingContactReady === 'true') return;

		const toggle = root.querySelector('.floating-contact__toggle');
		const panel = root.querySelector('.floating-contact__panel');
		const label = toggle?.querySelector('.floating-contact__toggle-text');
		if (!toggle || !panel) return;

		const setExpandedLabel = (expanded) => {
			const key = expanded ? 'floatingContact.closeLabel' : 'floatingContact.openLabel';
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
			setExpandedLabel(false);
		};

		const open = () => {
			toggle.setAttribute('aria-expanded', 'true');
			panel.hidden = false;
			setExpandedLabel(true);
			const focusable = getFocusable(panel);
			if (focusable[0]) focusable[0].focus();
		};

		const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

		toggle.addEventListener('click', () => {
			if (isOpen()) close();
			else open();
		});

		panel.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => close());
		});

		document.addEventListener('click', (event) => {
			if (!isOpen()) return;
			if (!root.contains(event.target)) close();
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && isOpen()) {
				close();
				toggle.focus();
			}

			if (event.key !== 'Tab' || !isOpen()) return;

			const focusable = [toggle, ...getFocusable(panel)];
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
		root.dataset.floatingContactReady = 'true';
	});
};

export default floatingContact;
