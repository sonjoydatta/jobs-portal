import { Avatar, Card } from '@/components';
import { ChangeEvent, FC, memo, useCallback, useRef } from 'react';
import { BasicInfoForm } from './BasicInfoForm';
import { CardHeader } from './styles';

type HeaderProps = {
	imageURL: string;
	name: string;
	age: string;
};

export const Header: FC<HeaderProps> = memo(({ name, imageURL, age }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleTriggerAvatarClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	}, []);

	const handleUploadAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		console.log(value);
	}, []);

	return (
		<CardHeader>
			<div className='content'>
				<Avatar className='content-avatar' size='xl' onClick={handleTriggerAvatarClick}>
					<img src={imageURL} alt={name} />
					<input
						ref={inputRef}
						type='file'
						style={{ display: 'none' }}
						onChange={handleUploadAvatar}
					/>
				</Avatar>
				<Card.Title className='content-title'>{name}</Card.Title>
				<p className='content-subtitle'>Age: {age}</p>
			</div>
			<BasicInfoForm />
		</CardHeader>
	);
});
