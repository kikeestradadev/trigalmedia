import styleGuideContainer from './modules/styleGuideContainer';
import Prism from 'prismjs';
import languageSwitch from './modules/languageSwitch';
import siteHeader from './modules/siteHeader';
import faq from './modules/faq';
import services from './modules/services';
import serviciosCatalog from './modules/serviciosCatalog';
import contactContext from './modules/contactContext';
import smoothScroll from './modules/smoothScroll';
import floatingContact from './modules/floatingContact';
import articleGridSlider from './modules/articleGridSlider';

const initComponents = () => {
	languageSwitch();
	siteHeader();
	faq();
	services();
	serviciosCatalog();
	contactContext();
	smoothScroll();
	floatingContact();
	articleGridSlider();
	styleGuideContainer();
	Prism.highlightAll();
};

document.addEventListener('DOMContentLoaded', initComponents);
