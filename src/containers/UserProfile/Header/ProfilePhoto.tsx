import { profileService } from '@/libs/api';
import { profileStore, useProfileStore } from '@/store';
import { defaultTextAvatar } from '@/utils/helpers';
import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { InitialsAvatar } from '../styles';
import { ProfileAvatar } from './styles';

export const ProfilePhoto: FC = () => {
	const [isLoading, setLoading] = useState(false);
	const {
		user: { name, avatar },
		isEditable,
	} = useProfileStore();
	const inputRef = useRef<HTMLInputElement>(null);
	const { addToast } = useToasts();

	const handleClick = useCallback(() => {
		if (isEditable && !isLoading && inputRef.current) {
			inputRef.current.click();
		}
	}, [isEditable, isLoading]);

	const handleUpload = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files[0]) {
				const img = e.target.files[0];
				if (img && isEditable) {
					setLoading(true);
					try {
						const res = await profileService.updateProfileAvatar(img);
						if (!res.success) throw new Error(res.error);

						addToast('Upload success', {
							appearance: 'success',
							autoDismiss: true,
						});
						profileStore.setUser((prev) => ({ ...prev, ...res.data }));
					} catch (error) {
						if (error instanceof Error) {
							addToast(error.message, {
								appearance: 'error',
								autoDismiss: true,
							});
						}
					} finally {
						setLoading(false);
					}
				}
			}
		},
		[addToast, isEditable]
	);

	const imageComponent = useMemo(() => {
		if (avatar?.includes('http')) return <img src={avatar} alt={name} />;

		return (
			<InitialsAvatar name={name}>{defaultTextAvatar(name)}</InitialsAvatar>
		);
	}, [avatar, name]);

	return (
		<ProfileAvatar
			size='xl'
			isEditable={isEditable}
			isLoading={isLoading}
			onClick={handleClick}
		>
			{imageComponent}
			<input
				ref={inputRef}
				type='file'
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handleUpload}
			/>
		</ProfileAvatar>
	);
};
