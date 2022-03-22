import { profileStore } from '@/store';
import { defaultTextAvatar } from '@/utils/helpers';
import { cleanup, render } from '@testing-library/react';
import { ToastProvider } from 'react-toast-notifications';
import { Header } from '..';

const renderHeader = () =>
	render(
		<ToastProvider>
			<Header />
		</ToastProvider>
	);

const testIds = {
	title: 'profile-header-title',
	subtitle: 'profile-header-subtitle',
	publicButton: 'profile-public-button',
	publicUrl: 'profile-public-url',
	avatar: 'profile-avatar',
	photo: 'profile-photo',
	photoInput: 'profile-photo-input',
};

const user = {
	_id: '5f3f8f9f8f9f9f9f9f9f9f9',
	name: 'John Doe',
	email: 'jhon@example.com',
	age: '8 years 7 months',
	isPublic: false,
	avatar: 'https://avatars2.githubusercontent.com/u/174825?v=4',
};

afterEach(() => {
	cleanup();
});

test('Initial UI renders correctly', () => {
	const { getByTestId } = renderHeader();

	const title = getByTestId(testIds.title);
	expect(title).toBeInTheDocument();
	expect(title).toHaveTextContent('');

	const subtitle = getByTestId(testIds.subtitle);
	expect(subtitle).toBeInTheDocument();
	expect(subtitle).toHaveTextContent('Age:');

	const publicButton = getByTestId(testIds.publicButton);
	expect(publicButton).toBeInTheDocument();
	expect(publicButton).toHaveTextContent('Mark as public');

	const avatar = getByTestId(testIds.avatar);
	expect(avatar).toBeInTheDocument();
	expect(avatar).toHaveTextContent('');

	const photoInput = getByTestId(testIds.photoInput);
	expect(photoInput).toBeInTheDocument();
	expect(photoInput).toHaveAttribute('type', 'file');
});

test('UI should render correctly with data', () => {
	profileStore.setUser(user);
	const { getByTestId } = renderHeader();

	const title = getByTestId(testIds.title);
	expect(title).toHaveTextContent(user.name);

	const subtitle = getByTestId(testIds.subtitle);
	expect(subtitle).toHaveTextContent(`Age: ${user.age}`);

	const photo = getByTestId(testIds.photo);
	expect(photo).toHaveAttribute('src', user.avatar);
});

test('UI should render correctly with public mode', () => {
	profileStore.setUser({ ...user, isPublic: true });
	const { getByTestId } = renderHeader();

	const publicButton = getByTestId(testIds.publicButton);
	expect(publicButton).toHaveTextContent('Mark as private');

	const publicUrl = getByTestId(testIds.publicUrl);
	expect(publicUrl).toHaveAttribute(
		'value',
		`${window.location.origin}/public/${user._id}`
	);
});

test('Avatar should render name characters when URL is empty', () => {
	profileStore.setUser({ ...user, avatar: '' });
	const { getByTestId } = renderHeader();

	const avatar = getByTestId(testIds.avatar);
	const value = defaultTextAvatar(user.name);
	expect(avatar).toHaveTextContent(value);
});
