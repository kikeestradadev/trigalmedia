import { onLanguageChange, t } from './languageSwitch';

const getDesktopMedia = () => {
	const raw = getComputedStyle(document.documentElement).getPropertyValue('--l').trim() || '960px';
	return window.matchMedia(`(min-width: ${raw})`);
};

const navLabels = () => ({
	prevSlideMessage: t('site.articleGrid.prevLabel') || 'Anterior',
	nextSlideMessage: t('site.articleGrid.nextLabel') || 'Siguiente',
});

const applyNavLabels = (root, instance) => {
	const labels = navLabels();
	if (instance && !instance.destroyed) {
		instance.params.a11y.prevSlideMessage = labels.prevSlideMessage;
		instance.params.a11y.nextSlideMessage = labels.nextSlideMessage;
	}

	const prev = root.querySelector('.article-grid-slider__prev');
	const next = root.querySelector('.article-grid-slider__next');
	if (prev) prev.setAttribute('aria-label', labels.prevSlideMessage);
	if (next) next.setAttribute('aria-label', labels.nextSlideMessage);
};

const createSwiper = (root) => {
	const el = root.querySelector('.swiper');
	if (!el) return null;

	return new Swiper(el, {
		slidesPerView: 'auto',
		spaceBetween: 16,
		watchOverflow: true,
		grabCursor: true,
		a11y: navLabels(),
		pagination: {
			el: root.querySelector('.article-grid-slider__pagination'),
			clickable: true,
		},
		navigation: {
			nextEl: root.querySelector('.article-grid-slider__next'),
			prevEl: root.querySelector('.article-grid-slider__prev'),
		},
	});
};

const articleGridSlider = () => {
	if (typeof Swiper === 'undefined') return;

	const media = getDesktopMedia();

	document.querySelectorAll('[data-article-grid]').forEach((root) => {
		if (root.dataset.articleGridSliderReady === 'true') return;

		let instance = null;

		const sync = () => {
			if (media.matches) {
				if (instance) {
					instance.destroy(true, true);
					instance = null;
				}
				root.classList.remove('article-grid--slider');
				root.classList.add('article-grid--grid');
				return;
			}

			root.classList.add('article-grid--slider');
			root.classList.remove('article-grid--grid');

			if (!instance) {
				instance = createSwiper(root);
				applyNavLabels(root, instance);
			}
		};

		media.addEventListener('change', sync);
		onLanguageChange(() => applyNavLabels(root, instance));
		sync();

		root.dataset.articleGridSliderReady = 'true';
	});
};

export default articleGridSlider;
