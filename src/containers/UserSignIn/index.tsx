import { Button, Card, Form } from '@/components';
import { authService } from '@/libs/api';
import { useForm } from '@/libs/hooks';
import { authStore } from '@/store';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { SignInContainer } from './styles';
import { initialErrors, initialValues, validateForm } from './validations';

export const UserSignIn = () => {
	const router = useRouter();

	const handleFormSubmit = async (payload: IAPI.LoginPayload) => {
		if (payload) {
			const res = await authService.login(payload);
			if (res.success) {
				const { token } = res.data;
				setCookie(null, 'token', token, {
					maxAge: 7 * 24 * 60 * 60,
					path: '/',
				});
				authStore.setState({ isLoggedIn: true, accessToken: token });
				router.push('/dashboard/profile');
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
