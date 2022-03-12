import { formatValidatorKey } from '@/utils/helpers';

export const initialValues = {
	jobTitle: '',
	company: '',
	startMonth: '',
	startYear: '',
	endMonth: '',
	endYear: '',
	description: '',
};

export const initialErrors = {
	jobTitle: '',
	company: '',
	startMonth: '',
	startYear: '',
};

export const validateForm = (
	values: Partial<typeof initialValues>
): Partial<typeof initialErrors> => {
	const errors: Partial<typeof initialErrors> = {};

	if (values && Object.keys(values).length > 0) {
		for (const key of Object.keys(values) as (keyof typeof initialValues)[]) {
			if (key in initialErrors) {
				errors[key as keyof typeof initialErrors] = !values[key]
					? `${formatValidatorKey(key)} is required`
					: '';
			}
		}
	}

	return errors;
};
