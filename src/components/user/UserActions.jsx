import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../modal/Modal';
import UserDeleteForm from '../user-forms/UserDeleteForm';
import UserEditForm from '../user-forms/UserEditForm';

const UserActions = ({ user }) => {
	const [modalContent, setModalContent] = useState();

	return (
		<>
			<Modal closeModal={() => setModalContent()}>{modalContent}</Modal>
			<IconButton
				icon={PencilIcon}
				onClick={() =>
					setModalContent(
						<UserEditForm
							currentUser={user}
							closeModal={() => setModalContent()}
						/>
					)
				}
			/>
			<IconButton
				icon={TrashIcon}
				kind='red'
				onClick={() =>
					setModalContent(
						<UserDeleteForm
							currentUser={user}
							closeModal={() => setModalContent()}
						/>
					)
				}
			/>
		</>
	);
};

export default UserActions;
