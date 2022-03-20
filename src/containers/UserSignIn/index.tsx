import { Button, Card, Form } from '@/components';
import { authService } from '@/libs/api';
import { useForm } from '@/libs/hooks';
import { authStore } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { SignInContainer } from './styles';
import { initialErrors, initialValues, validateForm } from './validations';

export const UserSignIn = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useToasts();

	const handleFormSubmit = async (payload: IAPI.LoginPayload) => {
		if (payload) {
			setIsLoading(true);
			try {
				const res = await authService.login(payload);
				if (!res.success) throw new Error(res.error);

				const { token } = res.data;
				if (!token) throw new Error('Failed to get token');

				addToast('Login success', { appearance: 'success', autoDismiss: true });
				authStore.setState({ isLoggedIn: true, accessToken: token });
				router.push('/dashboard/profile');
			} catch (error) {
				setIsLoading(false);
				if (error instanceof Error) {
					addToast(error.message, { appearance: 'error', autoDismiss: true });
				}
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
					<Button type='submit' block disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Sign In'}
					</Button>
					<Link href='/register'>Create a new account</Link>
				</form>
			</Card>
		</SignInContainer>
	);
};
