const coreModule = () => {
	document.querySelectorAll('.core-module').forEach((root) => {
		// Toda consulta y listener queda acotado a root.
		root.dataset.coreModuleReady = 'true';
	});
};

export default coreModule;
