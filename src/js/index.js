import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import siteHeader from './modules/siteHeader';
import projectsSlider from './modules/projectsSlider';
import faq from './modules/faq';
import scrollReveal from './modules/scrollReveal';

const initComponents = () => {
	coreModule();
	internalModule();
	siteHeader();
	projectsSlider();
	faq();
	scrollReveal();
};

document.addEventListener('DOMContentLoaded', initComponents);
