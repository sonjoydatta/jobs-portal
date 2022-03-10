import { Header } from './Header';
import { ProfileContainer } from './styles';

export const Profile = () => {
	return (
		<ProfileContainer>
			<Header
				name='Sonjoy Datta'
				imageURL='https://media-exp1.licdn.com/dms/image/C5603AQGIj2HGGzpnlA/profile-displayphoto-shrink_400_400/0/1637839690654?e=1652313600&v=beta&t=ynPtpehm05GizVRcPhlACJjKaRc8LAYXWoKgfvKbvIQ'
				age='23 years 3 months'
			/>
		</ProfileContainer>
	);
};
