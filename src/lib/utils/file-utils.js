export const filteToDataUrl = async file =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.readAsDataURL(file);

		fileReader.addEventListener('loadend', () => resolve(fileReader.result));

		fileReader.addEventListener('abort', () =>
			reject(new Error('Error al procesar'))
		);
		fileReader.addEventListener('error', () =>
			reject(new Error('Error al procesar'))
		);
	});
