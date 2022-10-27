import { useEffect, useState } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/usersValidation';

export const useCreateForm = () => {
	const [formValues, setFormValues] = useState({
		name: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			loading: false,
			error: undefined
		}
	});

	const setName = newName => {
		const error = validateName(newName);
		setFormValues(prev => ({
			...prev,
			name: { value: newName, error }
		}));
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		setFormValues(prev => ({
			...prev,
			username: { value: newUsername, loading: !error, error }
		}));
	};

	const setUsernameError = error => {
		setFormValues(prev => ({
			...prev,
			username: {
				value: prev.username.value,
				error,
				loading: false
			}
		}));
	};

	useEffect(() => {
		if (!formValues.username.loading) return;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			validateUserNameIsAvailable(
				formValues.username.value,
				setUsernameError,
				controller.signal
			);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
			controller.abort();
		};
	}, [formValues.username.loading, formValues.username.value]);

	const isFormValid =
		formValues.name.value ||
		!formValues.name.error ||
		formValues.username.value ||
		!formValues.username.error ||
		!formValues.username.loading;

	return { ...formValues, setName, setUsername, isFormValid };
};

const validateUserNameIsAvailable = async (
	username,
	setUsernameError,
	signal
) => {
	const { user, abort, error } = await findUserByUsername(username, signal);

	if (abort) return;
	if (error) return setUsernameError('Error al validar');
	setUsernameError(user ? 'Ya está en uso' : undefined);
};
