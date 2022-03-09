import { FC, memo } from 'react';
import { FormItemProps } from '../@types';
import { FormGroup, FormInput, FormLabel, FormMessage } from './styles';

export const FormItem: FC<FormItemProps> = memo(
	({
		inputProps,
		labelProps: { labelText, ...restLabelProps } = {
			labelText: '',
		},
		variant,
		message,
		...rest
	}) => (
		<FormGroup {...rest}>
			<FormLabel {...restLabelProps}>{labelText}</FormLabel>
			<FormInput {...inputProps} variant={variant} />
			{message && <FormMessage variant={variant}>{message}</FormMessage>}
		</FormGroup>
	)
);
