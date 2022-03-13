import { Card } from '@/components/Card';
import { Experience } from './Experience';
import { Header } from './Header';
import { ProfileContainer } from './styles';

export const UserProfile = () => (
	<ProfileContainer>
		<Card>
			<Header />
		</Card>
		<Experience />
	</ProfileContainer>
);
