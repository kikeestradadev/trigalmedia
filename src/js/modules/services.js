const services = () => {
	document.querySelectorAll('.services').forEach((root) => {
		if (root.dataset.servicesReady === 'true') return;

		root.querySelectorAll('.services__toggle').forEach((button) => {
			button.addEventListener('click', () => {
				const expanded = button.getAttribute('aria-expanded') === 'true';
				button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
			});
		});

		root.dataset.servicesReady = 'true';
	});
};

export default services;
