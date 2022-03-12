import { Button, Card, Form } from '@/components';
import { authService } from '@/libs/api';
import { useForm } from '@/libs/hooks';
import { authStore } from '@/store';
import { SignInContainer } from './styles';
import { initialErrors, initialValues, validateForm } from './validations';

export const UserSignIn = () => {
	const handleFormSubmit = async (payload: IAPI.LoginPayload) => {
		if (payload) {
			const res = await authService.login(payload);
			if (res.success) {
				const { token, user } = res.data;
				authStore.setState((state) => ({ ...state, isLoggedIn: true, token, user }));
			}
		}
	};

	const { values, errors, handleSubmit, handleChange } = useForm({
		initialValues,
		initialErrors,
		onSuccess: handleFormSubmit,
		validate: validateForm,
	});

	return (
		<SignInContainer>
			<Card>
				<Card.Header style={{ marginBottom: '1rem' }}>
					<Card.Title>Please, Sign in</Card.Title>
				</Card.Header>
				<form onSubmit={handleSubmit}>
					<Form.Item
						labelProps={{
							labelText: 'Email',
							srOnly: true,
						}}
						inputProps={{
							type: 'email',
							name: 'email',
							placeholder: 'Enter your email',
							value: values.email,
							onChange: handleChange,
						}}
						variant={errors.email ? 'danger' : undefined}
						message={errors.email}
					/>
					<Form.Item
						labelProps={{
							labelText: 'Password',
							srOnly: true,
						}}
						inputProps={{
							type: 'password',
							name: 'password',
							placeholder: 'Enter your password',
							value: values.password,
							onChange: handleChange,
						}}
						variant={errors.password ? 'danger' : undefined}
						message={errors.password}
					/>
					<Button type='submit' block>
						Sign In
					</Button>
				</form>
			</Card>
		</SignInContainer>
	);
};
