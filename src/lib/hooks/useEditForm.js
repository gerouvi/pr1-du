import { useEffect, useState } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/usersValidation';

export const useEditForm = user => {
	const [formValues, setFormValues] = useState(() => getInitialValues(user));

	const setName = newName => {
		const error = validateName(newName);
		setFormValues(prev => ({
			...prev,
			name: { value: newName, error }
		}));
	};

	const setUsername = newUsername => {
		const error = validateUsername(newUsername);
		const isInitialValue = newUsername === user.username;

		setFormValues(prev => ({
			...prev,
			username: {
				value: newUsername,
				loading: !error && !isInitialValue,
				error
			}
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

	const setRole = role => {
		setFormValues(prev => ({
			...prev,
			role
		}));
	};

	const setActive = active => {
		setFormValues(prev => ({
			...prev,
			active
		}));
	};

	useEffect(() => {
		setFormValues(getInitialValues(user));
	}, [user]);

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
		(formValues.name.value !== user.name ||
			formValues.username.value !== user.username ||
			formValues.active !== user.active ||
			formValues.role !== user.role) &&
		!formValues.name.error &&
		!formValues.username.error &&
		!formValues.username.loading;

	return {
		...formValues,
		setName,
		setUsername,
		setRole,
		setActive,
		isFormValid
	};
};
const getInitialValues = user => ({
	name: {
		value: user.name,
		error: undefined
	},
	username: {
		value: user.username,
		loading: false,
		error: undefined
	},
	role: user.role,
	active: user.active
});

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
