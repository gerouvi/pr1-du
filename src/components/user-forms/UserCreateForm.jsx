import { useContext, useState } from 'react';
import { USERS_ROLES } from '../../constants/usersRoles';
import {
	nameChanged,
	usernameChanged
} from '../../lib/actions/createFormActions';
import { createUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import { useCreateForm } from '../../lib/hooks/useCreateForm';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserCreateForm.module.css';

const UserCreateForm = ({ closeModal }) => {
	const { onSuccess } = useContext(UsersFormContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { name, username, dispatchFormValues, isFormValid } = useCreateForm();

	return (
		<form
			className={style.form}
			onSubmit={e =>
				handleSubmit(e, name, username, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<InputText
				label='Nombre'
				placeholder='Gerard'
				value={name.value}
				error={name.error}
				onChange={e => dispatchFormValues(nameChanged(e.target.value))}
			/>
			<InputTextAsync
				label='Username'
				placeholder='GRouraV'
				value={username.value}
				error={username.error}
				loading={username.loading}
				success={username.value && !username.error && !username.loading}
				onChange={e => dispatchFormValues(usernameChanged(e.target.value))}
			/>

			<Select name='role'>
				<option value={USERS_ROLES.TEACHER}>Profesor</option>
				<option value={USERS_ROLES.STUDENT}>Alumno</option>
				<option value={USERS_ROLES.OTHER}>Otro</option>
			</Select>
			<div className={style.active}>
				<InputCheckbox name='active' />
				<span>¿Activo?</span>
			</div>
			<Button type='submit' disabled={!isFormValid || isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Crear usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	e,
	name,
	username,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	e.preventDefault();

	setIsSubmitting(true);

	const user = {
		id: crypto.randomUUID(),
		name: name.value,
		username: username.value,
		role: e.target.role.value,
		active: e.target.active.checked
	};

	const success = await createUser(user);

	if (success) {
		onSuccess();
		closeModal();
	} else setIsSubmitting(false);
};

export default UserCreateForm;
