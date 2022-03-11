export const isNullProperties = (obj: Record<string, unknown>): boolean => {
	for (const key in obj) {
		if (obj[key] !== null && obj[key] !== '') return false;
	}
	return true;
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
