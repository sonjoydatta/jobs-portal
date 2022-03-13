import { formatValidatorKey } from '@/utils/helpers';

export const initialValues = {
	name: '',
	age: '',
};

export const initialErrors = {
	name: '',
	age: '',
};

export const validateForm = (
	values: Partial<typeof initialValues>
): Partial<typeof initialErrors> => {
	const errors: Partial<typeof initialErrors> = {};

	if (values && Object.keys(values).length > 0) {
		for (const key of Object.keys(values) as (keyof typeof initialValues)[]) {
			if (key in initialErrors) {
				errors[key] = !values[key] ? `${formatValidatorKey(key)} is required` : '';
			}
		}
	}

	return errors;
};
