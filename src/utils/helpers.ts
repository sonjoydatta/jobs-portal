export const isNullProperties = (obj: Record<string, unknown>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

export const formatReadable = (value: string): string =>
	value.replace(/([A-Z])/g, ' $1');

export const formatValidatorKey = (value: string): string => {
	const val = formatReadable(value);
	return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};

export const yearOptions = () => {
	const years = [];
	const currentYear = new Date().getFullYear();

	for (let i = currentYear; i >= currentYear - 100; i--) {
		years.push({
			value: `${i}`,
			label: `${i}`,
		});
	}

	return years;
};

export const defaultTextAvatar = (name: string) => {
	const initials = name
		.split(' ')
		.splice(0, 2)
		.map((word) => word.charAt(0))
		.join('')
		.toUpperCase();

	return initials.toUpperCase();
};

export const sortByDate = (a?: string, b?: string) =>
	new Date(a || new Date()).getTime() - new Date(b || new Date()).getTime();
