import { useContext, useState } from 'react';
import { USERS_ROLES } from '../../constants/usersRoles';
import { updateUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import { useEditForm } from '../../lib/hooks/useEditForm';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import style from './UserEditForm.module.css';

const UserEditForm = () => {
	const { currentUser, onSuccess } = useContext(UsersFormContext);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		name,
		username,
		role,
		active,
		setName,
		setUsername,
		setRole,
		setActive,
		isFormValid
	} = useEditForm(currentUser);

	return (
		<form
			onSubmit={e =>
				handleSubmit(
					e,
					{
						id: currentUser.id,
						name: name.value,
						username: username.value,
						role,
						active
					},
					setIsSubmitting,
					onSuccess
				)
			}
		>
			<div className={style.row}>
				<InputText
					className={style.input}
					label='Nombre'
					placeholder='Gerard'
					value={name.value}
					error={name.error}
					onChange={e => setName(e.target.value)}
				/>
				<InputTextAsync
					className={style.input}
					label='Username'
					placeholder='GRouraV'
					value={username.value}
					error={username.error}
					loading={username.loading}
					success={
						username.value !== currentUser.username &&
						!username.error &&
						!username.loading
					}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div className={style.row}>
				<Select value={role} onChange={e => setRole(e.target.value)}>
					<option value={USERS_ROLES.TEACHER}>Profesor</option>
					<option value={USERS_ROLES.STUDENT}>Alumno</option>
					<option value={USERS_ROLES.OTHER}>Otro</option>
				</Select>
				<div
					className={style.active}
					onChange={e => setActive(e.target.checked)}
				>
					<InputCheckbox
						checked={active}
						onChange={e => setActive(e.target.checked)}
					/>
					<span>¿Activo?</span>
				</div>
				<Button type='submit' disabled={!isFormValid || isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Editar usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (e, user, setIsSubmitting, onSuccess) => {
	e.preventDefault();

	setIsSubmitting(true);

	const success = await updateUser(user);

	if (success) onSuccess();
	else setIsSubmitting(false);
};

export default UserEditForm;
