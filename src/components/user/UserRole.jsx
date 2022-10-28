import { USERS_ROLES } from '../../constants/usersRoles';
import style from './UserRole.module.css';

const ROLE_STYLES = {
	[USERS_ROLES.TEACHER]: ['Profesor', style.teacher],
	[USERS_ROLES.STUDENT]: ['Student', style.student],
	[USERS_ROLES.OTHER]: ['Other', style.other]
};

const UserRole = ({ role }) => {
	const [roleName, roleClassname] = ROLE_STYLES[role] || ROLE_STYLES.other;

	return <span className={`${style.role} ${roleClassname}`}>{roleName}</span>;
};

export default UserRole;
