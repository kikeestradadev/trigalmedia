const projectsSlider = () => {
	if (typeof window.Swiper === 'undefined') return;

	document.querySelectorAll('.projects-slider').forEach((root) => {
		if (root.dataset.projectsSliderReady === 'true') return;
		root.dataset.projectsSliderReady = 'true';

		const el = root.querySelector('.projects-slider__swiper');
		const prev = root.querySelector('.projects-slider__nav--prev');
		const next = root.querySelector('.projects-slider__nav--next');
		const pagination = root.querySelector('.projects-slider__pagination');
		if (!el) return;

		// eslint-disable-next-line no-new
		new window.Swiper(el, {
			slidesPerView: 1,
			spaceBetween: 16,
			loop: false,
			watchOverflow: true,
			pagination: pagination
				? {
						el: pagination,
						clickable: true,
					}
				: undefined,
			navigation: {
				prevEl: prev,
				nextEl: next,
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				960: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
		});
	});
};

export default projectsSlider;
