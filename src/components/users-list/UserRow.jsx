import UserActions from '../user/UserActions';
import UserDisplay from '../user/UserDisplay';
import UserRole from '../user/UserRole';
import UserStatus from '../user/UserStatus';
import style from './UserRow.module.css';

const UserRow = ({ user }) => (
	<div className={style.wrapper}>
		<div className={style.name}>
			<UserDisplay username={user.username} name={user.name} />
		</div>
		<div className={style.status}>
			<UserStatus active={user.active} />
		</div>
		<div className={style.role}>
			<UserRole role={user.role} />
		</div>
		<div className={style.action}>
			<UserActions user={user} />
		</div>
	</div>
);

export default UserRow;
