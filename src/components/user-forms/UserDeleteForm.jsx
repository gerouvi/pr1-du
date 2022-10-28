import { useState } from 'react';
import { deleteUser } from '../../lib/api/usersApi';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ user, onSuccess, onCancel }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form onSubmit={e => handleSubmit(e, user.id, setIsSubmitting, onSuccess)}>
			<p
				className={style.text}
			>{`Estás seguro que quieres elminar al usuario ${user.name}?`}</p>
			<div className={style.row}>
				<Button
					type='button'
					disabled={isSubmitting}
					kind='secondary'
					onClick={onCancel}
				>
					{isSubmitting ? 'Cargando...' : 'Cancelar'}
				</Button>
				<Button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
				</Button>
			</div>
		</form>
	);
};

const handleSubmit = async (e, userId, setIsSubmitting, onSuccess) => {
	e.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUser(userId);

	if (success) onSuccess();
	else setIsSubmitting(false);
};

export default UserDeleteForm;
