const scrollReveal = () => {
	const targets = document.querySelectorAll('.reveal');
	if (!targets.length) return;

	if (!('IntersectionObserver' in window)) {
		targets.forEach((el) => el.classList.add('reveal--visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.remove('reveal--pending');
				entry.target.classList.add('reveal--visible');
				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.08,
			rootMargin: '0px 0px -32px 0px',
		}
	);

	targets.forEach((el) => {
		el.classList.add('reveal--pending');
		observer.observe(el);
	});
};

export default scrollReveal;
