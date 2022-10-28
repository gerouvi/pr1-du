import { useContext } from 'react';
import { USERS_FORMS } from '../../constants/usersForms';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import UserCreateForm from './UserCreateForm';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';
import style from './UsersFormContainer.module.css';

const FORMS = {
	[USERS_FORMS.CREATE]: <UserCreateForm />,
	[USERS_FORMS.EDIT]: <UserEditForm />,
	[USERS_FORMS.DELETE]: <UserDeleteForm />
};

const UsersFormContainer = () => {
	const { currentForm, setFiltersForm } = useContext(UsersFormContext);

	const form = FORMS[currentForm];

	if (!form) return null;
	return (
		<div className={style.wrapper}>
			<IconButton
				className={style.close}
				icon={CrossIcon}
				filled
				onClick={setFiltersForm}
			/>
			{form}
		</div>
	);
};

export default UsersFormContainer;
