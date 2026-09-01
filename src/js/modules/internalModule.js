const internalModule = () => {
	document.querySelectorAll('.internal-module').forEach((root) => {
		// Toda consulta y listener queda acotado a root.
		root.dataset.internalModuleReady = 'true';
	});
};

export default internalModule;
