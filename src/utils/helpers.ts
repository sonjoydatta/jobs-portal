export const isNullProperties = (obj: Record<string, unknown>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatReadable = (value: string): string => value.replace(/([A-Z])/g, ' $1');

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
