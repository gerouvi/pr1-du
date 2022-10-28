import { useContext } from 'react';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import UserDisplay from '../user/UserDisplay';
import UserRole from '../user/UserRole';
import UserStatus from '../user/UserStatus';
import style from './UserCard.module.css';

const USerCard = ({ id, username, name, active, role }) => {
	const { setEditForm, setDeleteForm } = useContext(UsersFormContext);
	return (
		<div className={style.wrapper}>
			<div className={style.card}>
				<div className={style.name}>
					<UserDisplay username={username} name={name} />
				</div>
				<div className={style.info}>
					<UserRole role={role} />
					<UserStatus active={active} />
					<div className={style.actions}>
						<IconButton
							icon={PencilIcon}
							onClick={() => setEditForm({ id, name, username, active, role })}
						/>
						<IconButton
							icon={TrashIcon}
							kind='red'
							onClick={() => setDeleteForm({ name, id })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default USerCard;
