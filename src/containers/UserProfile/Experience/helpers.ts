import { initialValues } from './validations';

type Values = typeof initialValues & {
	avatar?: string;
};

export const convertToValues = (data: IAPI.ExperienceResponce) => {
	const values = {} as Values;

	for (const key in data) {
		switch (key as keyof IAPI.ExperienceResponce) {
			case 'title':
				values.title = data.title;
				break;

			case 'company':
				values.company = data.company;
				break;

			case 'from':
				{
					const from = data.from.split(' ');
					values.startMonth = from[0];
					values.startYear = from[1];
				}
				break;

			case 'to':
				if (data.to) {
					const to = data.to.split(' ');
					values.endMonth = to[0];
					values.endYear = to[1];
				}
				break;

			case 'isCurrent':
				values.isCurrent = data.isCurrent || false;
				break;

			case 'description':
				values.description = data.description || '';
				break;

			case 'avatar':
				values.avatar = data.avatar || undefined;
				break;

			default:
				break;
		}
	}

	return values;
};

export const convertToPayload = (values: typeof initialValues) => {
	const payload: Omit<IAPI.ExperiencePayload, 'avatar'> = {
		title: values.title,
		company: values.company,
		from: `${values.startMonth} ${values.startYear}`,
		to: values.isCurrent ? undefined : `${values.endMonth} ${values.endYear}`,
		isCurrent: values.isCurrent,
		description: values.description,
	};

	return payload;
};
