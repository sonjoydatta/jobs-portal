import config from '@/config';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = {
	type: 'service_account',
	project_id: 'glints-70c4e',
	private_key_id: 'b237e5d374927bad496f72609ed4c7a903f325d5',
	private_key: config.firebasePvtKey,
	client_email: 'firebase-adminsdk-dvmr7@glints-70c4e.iam.gserviceaccount.com',
	client_id: '100085811721007525992',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dvmr7%40glints-70c4e.iam.gserviceaccount.com',
} as const;

let isInitialized = false;

const getBucket = () => {
	if (!isInitialized) {
		initializeApp({
			credential: admin.credential.cert(serviceAccount as unknown as string),
			storageBucket: 'glints-70c4e.appspot.com',
		});
		isInitialized = true;
	}
	return getStorage().bucket();
};

const uploadfile = async (folder: string, name: string, file: Buffer) => {
	const bucket = getBucket();
	const fileObject = bucket.file(`${folder}/${name}`);

	await fileObject.save(file);
	await fileObject.makePublic();

	return fileObject.publicUrl;
};

export const uploadAvatar = (name: string, file: Buffer) => uploadfile('user_avatars', name, file);
