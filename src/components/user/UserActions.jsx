import { useState } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import DotsIcon from '../icons/DotsIcon';
import PencilIcon from '../icons/PencilIcon';
import PictureIcon from '../icons/PictureIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../modal/Modal';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';
import UserPicForm from '../user-forms/UserPicForm';
import style from './UserActions.module.css';

const UserActions = ({ user }) => {
	const {
		modalContent,
		closeModal,
		openEditModal,
		openPicModal,
		openDeleteModal
	} = useModal(user);

	const { dropdownOpened, dropdownRef, openDropdown, closeDropdown } =
		useDropdown();

	return (
		<div className={style.wrapper}>
			<Modal closeModal={closeModal}>{modalContent}</Modal>
			<IconButton icon={DotsIcon} onClick={openDropdown} />
			{dropdownOpened && (
				<ul ref={dropdownRef} className={style.dropdown}>
					<li
						onClick={() => {
							openEditModal();
							closeDropdown();
						}}
					>
						<PencilIcon />
						<span>Editar</span>
					</li>
					<li
						onClick={() => {
							openPicModal();
							closeDropdown();
						}}
					>
						<PictureIcon />
						<span>Cambiar foto</span>
					</li>
					<li
						onClick={() => {
							openDeleteModal();
							closeDropdown();
						}}
					>
						<TrashIcon />
						<span>Eliminar</span>
					</li>
				</ul>
			)}
		</div>
	);
};

const useModal = user => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => setModalContent();

	const openEditModal = () =>
		setModalContent(
			<UserEditForm currentUser={user} closeModal={closeModal} />
		);

	const openPicModal = () =>
		setModalContent(
			<UserPicForm currentUser={user} closeModal={() => setModalContent()} />
		);

	const openDeleteModal = () =>
		setModalContent(
			<UserDeleteForm currentUser={user} closeModal={() => setModalContent()} />
		);

	return {
		modalContent,
		closeModal,
		openEditModal,
		openPicModal,
		openDeleteModal
	};
};

export default UserActions;
