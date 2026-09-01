const smoothScroll = () => {
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		if (link.dataset.smoothScrollReady === 'true') return;

		link.addEventListener('click', (event) => {
			const href = link.getAttribute('href');
			if (!href || href === '#') return;

			const target = document.querySelector(href);
			if (!target) return;

			event.preventDefault();
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			target.scrollIntoView({
				behavior: reduceMotion ? 'auto' : 'smooth',
				block: 'start',
			});

			if (history.replaceState) {
				history.replaceState(null, '', href);
			}
		});

		link.dataset.smoothScrollReady = 'true';
	});
};

export default smoothScroll;
