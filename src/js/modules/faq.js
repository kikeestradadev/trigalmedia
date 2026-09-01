const faq = () => {
	document.querySelectorAll('.faq').forEach((root) => {
		if (root.dataset.faqReady === 'true') return;

		root.querySelectorAll('.faq__button').forEach((button) => {
			const panelId = button.getAttribute('aria-controls');
			const panel = panelId ? root.querySelector(`#${panelId}`) : null;
			if (!panel) return;

			button.addEventListener('click', () => {
				const expanded = button.getAttribute('aria-expanded') === 'true';
				button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
				panel.hidden = expanded;
			});
		});

		root.dataset.faqReady = 'true';
	});
};

export default faq;
