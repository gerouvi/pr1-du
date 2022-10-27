const REGEX = {
	USERNAME: /^[a-z0-9]+$/,
	START_WITH: /^[0-9]/,
	NAME: /^[a-záéíóú\s-]+$/i
};

export const validateUsername = username => {
	if (!REGEX.USERNAME.test(username)) return 'Sólo minúsculas o numeros';
	if (REGEX.START_WITH.test(username)) return 'No puede empezar por un número';
	if (username.length < 6 || username.length > 15)
		return 'Longitud entre 6 y 15';
};

export const validateName = name => {
	if (!REGEX.NAME.test(name)) return 'Sólo letras, espacios y guiones';
	if (name.includes('  ')) return 'No puede tener doble espacio';
	if (name.includes('--')) return 'No puede tener doble guión';
	const nameSplited = name.split(' ');

	for (const word of nameSplited) {
		if (word.startsWith('-') || word.endsWith('-'))
			return 'Uso de guiones incorrecto';
	}
	if (name.length < 2 || name.length > 30) return 'Longitud entre 2 y 30';
};
