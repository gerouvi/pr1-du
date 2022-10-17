import UserDisplay from './UserDisplay';
import UserRole from './UserRole';
import style from './UserRow.module.css';
import UserStatus from './UserStatus';

const UserRow = ({ username, name, active, role }) => (
	<div className={style.wrapper}>
		<div className={style.name}>
			<UserDisplay username={username} name={name} />
		</div>
		<div className={style.status}>
			<UserStatus active={active} />
		</div>
		<div className={style.role}>
			<UserRole role={role} />
		</div>
	</div>
);

export default UserRow;
