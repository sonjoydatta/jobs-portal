import { Card } from '@/components/Card';
import { Experience } from './Experience';
import { Header } from './Header';
import { ProfileContainer } from './styles';

export const UserProfile = () => {
	// useEffect(() => {
	// 	profileStore.setExperiences([
	// 		{
	// 			jobTitle: 'Software Engineer',
	// 			company: 'Strativ AB',
	// 			startDate: new Date('2021-10-01'),
	// 			logo: 'https://media-exp1.licdn.com/dms/image/C4D0BAQEFwMUolpORww/company-logo_100_100/0/1519920090100?e=1654732800&v=beta&t=nDTm5aNW0Q5M8G0chCGYIEuzqRbmCJdiWBA-728mqlo',
	// 			description:
	// 				'Developing user-centred frontend related UI, business logic, server-side and client-side implementations, Knowledge sharing with the team, Developing library/module for third-party users, Ensuring application is optimized for all devices, Developing custom solutions for complex implementation like payment, store, multi lang, etc features',
	// 		},
	// 		{
	// 			jobTitle: 'Senior Frontend Developer',
	// 			company: 'Zaynax Limited',
	// 			startDate: new Date('2020-08-01'),
	// 			endDate: new Date('2021-09-01'),
	// 			logo: 'https://media-exp1.licdn.com/dms/image/C4E0BAQH8h13JAFsOxA/company-logo_100_100/0/1600235633061?e=1654732800&v=beta&t=N_7nNQjA_T5PM0-Czt-rGDlm0AVf5-eOACu0LALFObw',
	// 			description:
	// 				'Playing leadership role for the Frontend team, Collaborating with the Backend and product development team regarding API’s, business logics, software requirements and more, Develop new user facing features and write reusable code and libraries, Enhance application for maximum speed and scalability, Validate input before submitting to back end, Define how the application looks and how it works, Translate UI/UX design wireframes to actual code',
	// 		},
	// 		{
	// 			jobTitle: 'Senior Frontend Developer',
	// 			company: 'Krazy IT',
	// 			startDate: new Date('2017-03-01'),
	// 			endDate: new Date('2020-07-01'),
	// 			logo: 'https://media-exp1.licdn.com/dms/image/C510BAQFgizoCWKaYYQ/company-logo_100_100/0/1572240068718?e=1654732800&v=beta&t=ZcIJkAzoP0es2BB8F9luxea5EFSkvG7qFgI30eaj50o',
	// 			description:
	// 				'As a Frontend Developer responsible for implementing visual and interactive elements that users engage with through their web browser when using a web application. Also, collaborating with the back-end developers, who are responsible for SSA logic.',
	// 		},
	// 	]);
	// }, []);

	return (
		<ProfileContainer>
			<Card>
				<Header />
			</Card>
			<Experience />
		</ProfileContainer>
	);
};
