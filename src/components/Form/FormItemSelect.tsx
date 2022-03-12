import { FC, memo } from 'react';
import { FormItemSelectProps } from '../@types';
import { FormGroup, FormLabel, FormMessage, FormSelect } from './styles';

export const FormItemSelect: FC<FormItemSelectProps> = memo(
	({
		selectProps,
		labelProps: { labelText, ...restLabelProps } = {
			labelText: '',
		},
		variant,
		message,
		options,
		...rest
	}) => (
		<FormGroup {...rest}>
			<FormLabel {...restLabelProps}>{labelText}</FormLabel>
			<FormSelect {...selectProps} variant={variant}>
				{options?.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</FormSelect>
			{message && <FormMessage variant={variant}>{message}</FormMessage>}
		</FormGroup>
	)
);
