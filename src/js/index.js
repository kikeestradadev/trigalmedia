import styleGuideContainer from './modules/styleGuideContainer';
import Prism from 'prismjs';
import languageSwitch from './modules/languageSwitch';
import siteHeader from './modules/siteHeader';
import faq from './modules/faq';
import smoothScroll from './modules/smoothScroll';
import floatingContact from './modules/floatingContact';
import articleGridSlider from './modules/articleGridSlider';

const initComponents = () => {
	languageSwitch();
	siteHeader();
	faq();
	smoothScroll();
	floatingContact();
	articleGridSlider();
	styleGuideContainer();
	Prism.highlightAll();
};

document.addEventListener('DOMContentLoaded', initComponents);
