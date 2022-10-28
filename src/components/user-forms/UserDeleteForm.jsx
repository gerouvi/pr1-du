import { useContext, useState } from 'react';
import { deleteUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = () => {
	const { currentUser, setFiltersForm, onSuccess } =
		useContext(UsersFormContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			onSubmit={e =>
				handleSubmit(e, currentUser.id, setIsSubmitting, onSuccess)
			}
		>
			<p
				className={style.text}
			>{`Estás seguro que quieres elminar al usuario ${currentUser.name}?`}</p>
			<div className={style.row}>
				<Button
					type='button'
					disabled={isSubmitting}
					kind='secondary'
					onClick={setFiltersForm}
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
