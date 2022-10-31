import { useEffect, useReducer } from 'react';
import { findUserByUsername } from '../api/usersApi';
import { validateName, validateUsername } from '../users/usersValidation';

export const useEditForm = user => {
	const [formValues, dispatchFormValues] = useReducer(
		formValuesReducer,
		user,
		getInitialValues
	);

	useEffect(() => {
		dispatchFormValues({ type: 'replace', value: getInitialValues(user) });
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

const formValuesReducer = (state, action) => {
	switch (action.type) {
		case 'name_changed': {
			const error = validateName(action.value);
			return {
				...state,
				name: { value: action.value, error }
			};
		}
		case 'username_changed': {
			const error = validateUsername(action.value);
			const isInitialValue = action.value === action.currentUsername;

			return {
				...state,
				username: {
					value: action.value,
					loading: !error && !isInitialValue,
					error
				}
			};
		}
		case 'role_changed':
			return {
				...state,
				role: action.value
			};
		case 'active_changed':
			return {
				...state,
				active: action.value
			};
		case 'username_error_changed':
			return {
				...state,
				username: {
					value: state.username.value,
					error: action.value,
					loading: false
				}
			};
		case 'replace':
			return action.value;
		default:
			throw new Error('Invalid action type');
	}
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
			type: 'username_error_changed',
			value: 'Error al validar'
		});
	dispatchFormValues({
		type: 'username_error_changed',
		value: user ? 'Ya está en uso' : undefined
	});
};
