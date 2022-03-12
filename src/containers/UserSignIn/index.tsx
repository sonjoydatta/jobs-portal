import { Button, Card, Form } from '@/components';
import { useAuthStoreSeletor } from '@/store/auth.store';
import { useEffect } from 'react';
import { SignInContainer } from './styles';

export const UserSignIn = () => {
	const isLoggedIn = useAuthStoreSeletor('isLoggedIn');

	useEffect(() => {
		if (isLoggedIn) {
			console.log('');
		}
	}, [isLoggedIn]);

	return (
		<SignInContainer>
			<Card>
				<Card.Header style={{ marginBottom: '1rem' }}>
					<Card.Title>Please, Sign in</Card.Title>
				</Card.Header>
				<form>
					<Form.Item
						labelProps={{
							labelText: 'Email',
							srOnly: true,
						}}
						inputProps={{
							type: 'email',
							name: 'email',
							placeholder: 'Enter your email',
						}}
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
						}}
					/>
					<Button type='submit' block>
						Sign In
					</Button>
				</form>
			</Card>
		</SignInContainer>
	);
};
