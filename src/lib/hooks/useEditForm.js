import { useEffect, useReducer } from 'react';
import { EDIT_FORM_ACTIONS } from '../../constants/editFormActions';
import { findUserByUsername } from '../api/usersApi';
import {
	editFormReducer,
	getEditFormInitialState
} from '../reducers/editFormReducer';

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		editFormReducer,
		user,
		getEditFormInitialState
	);

	useEffect(() => {
		dispatchFormValues({
			type: 'replace',
			value: getEditFormInitialState(user)
		});
	}, [user]);

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
		(formValues.name.value !== user.name ||
			formValues.username.value !== user.username ||
			formValues.active !== user.active ||
			formValues.role !== user.role) &&
		!formValues.name.error &&
		!formValues.username.error &&
		!formValues.username.loading;

	return {
		...formValues,
		dispatchFormValues,
		isFormValid
	};
};

const validateUserNameIsAvailable = async (
	username,
	dispatchFormValues,
	signal
) => {
	const { user, abort, error } = await findUserByUsername(username, signal);

	if (abort) return;
	if (error)
		return dispatchFormValues({
			type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
			value: 'Error al validar'
		});
	dispatchFormValues({
		type: EDIT_FORM_ACTIONS.USERNAME_ERROR,
		value: user ? 'Ya está en uso' : undefined
	});
};
