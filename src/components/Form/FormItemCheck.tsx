import { FC, memo } from 'react';
import { FormItemCheckProps } from '../@types';
import { FormCheck, FormGroup, FormLabel, FormMessage } from './styles';

export const FormItemCheck: FC<FormItemCheckProps> = memo(
	({
		inputProps: { type = 'checkbox' as const, ...restInputProps } = {
			type: 'checkbox',
		},
		labelProps: { labelText, ...restLabelProps } = {
			labelText: '',
		},
		variant,
		message,
		...rest
	}) => (
		<FormGroup {...rest}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<FormCheck {...restInputProps} type={type} variant={variant} />
				<FormLabel {...restLabelProps} style={{ marginBottom: 0 }}>
					{labelText}
				</FormLabel>
			</div>
			{message && <FormMessage variant={variant}>{message}</FormMessage>}
		</FormGroup>
	)
);
