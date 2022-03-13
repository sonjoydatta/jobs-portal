import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

export type UserFormProps<T, K> = {
	initialValues: T;
	initialErrors: K;
	validate: (values: Partial<T>) => Partial<K>;
	onSuccess: (values: T) => void;
};

export type FormElement =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement;

export type UserFormReturn<T, K> = {
	values: T;
	errors: K;
	setValues: Dispatch<SetStateAction<T>>;
	setErrors: Dispatch<SetStateAction<K>>;
	handleChange: (e: ChangeEvent<FormElement>) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
