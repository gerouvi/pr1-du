import { useEffect, useReducer } from 'react';
import { usernameErrorChanged } from '../actions/createFormActions';
import { findUserByUsername } from '../api/usersApi';
import {
	createFormReducer,
	CREATE_FORM_INITIAL_STATE
} from '../reducers/createFormreducer';

export const useCreateForm = () => {
	const [formValues, dispatchFormValues] = useReducer(
		createFormReducer,
		CREATE_FORM_INITIAL_STATE
	);

	useEffect(() => {
		if (!formValues.username.loading) return;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			validateUserNameIsAvailable(
				formValues.username.value,
				dispatchFormValues,
				controller.signal
			);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
			controller.abort();
		};
	}, [formValues.username.loading, formValues.username.value]);

	const isFormValid =
		formValues.name.value &&
		!formValues.name.error &&
		formValues.username.value &&
		!formValues.username.error &&
		!formValues.username.loading;

	return { ...formValues, dispatchFormValues, isFormValid };
};

const validateUserNameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, abort, error } = await findUserByUsername(username, signal);

	if (abort) return;

	let errorMessage;
	if (error) errorMessage = 'Error al validar';
	if (user) errorMessage = 'Ya está en uso';

	dispatchFormValues(usernameErrorChanged(errorMessage));
};
