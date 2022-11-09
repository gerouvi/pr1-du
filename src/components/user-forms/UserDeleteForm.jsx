import { useContext, useState } from 'react';
import { deleteUser } from '../../lib/api/usersApi';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import Button from '../buttons/Button';
import style from './UserDeleteForm.module.css';

const UserDeleteForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UsersFormContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<form
			className={style.form}
			onSubmit={e =>
				handleSubmit(e, currentUser.id, setIsSubmitting, onSuccess, closeModal)
			}
		>
			<p>{`Estás seguro que quieres elminar al usuario ${currentUser.name}?`}</p>

			<Button
				type='button'
				disabled={isSubmitting}
				kind='secondary'
				onClick={closeModal}
			>
				{isSubmitting ? 'Cargando...' : 'Cancelar'}
			</Button>
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Cargando...' : 'Eliminar usuario'}
			</Button>
		</form>
	);
};

const handleSubmit = async (
	e,
	userId,
	setIsSubmitting,
	onSuccess,
	closeModal
) => {
	e.preventDefault();

	setIsSubmitting(true);

	const success = await deleteUser(userId);

	if (success) {
		onSuccess();
		closeModal();
	} else setIsSubmitting(false);
};

export default UserDeleteForm;
