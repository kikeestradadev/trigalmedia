const faq = () => {
	document.querySelectorAll('.faq').forEach((root) => {
		if (root.dataset.faqReady === 'true') return;
		root.dataset.faqReady = 'true';

		const items = Array.from(root.querySelectorAll('.faq__item'));

		items.forEach((item) => {
			const trigger = item.querySelector('.faq__trigger');
			const panel = item.querySelector('.faq__panel');
			if (!trigger || !panel) return;

			trigger.addEventListener('click', () => {
				const isOpen = item.classList.contains('faq__item--open');

				items.forEach((other) => {
					const otherTrigger = other.querySelector('.faq__trigger');
					const otherPanel = other.querySelector('.faq__panel');
					other.classList.remove('faq__item--open');
					if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
					if (otherPanel) otherPanel.hidden = true;
				});

				if (!isOpen) {
					item.classList.add('faq__item--open');
					trigger.setAttribute('aria-expanded', 'true');
					panel.hidden = false;
				}
			});
		});
	});
};

export default faq;
