import USerCard from './UserCard';
import UserRow from './UserRow';
import style from './UsersListRows.module.css';

const UsersListRows = ({ users, usersError, usersLoading, view }) => {
	if (usersLoading) return <p>Cargando...</p>;
	if (usersError) return <p>Error al cargar los usuarios</p>;
	if (!users.length) return <p>No hay usuarios</p>;

	const UserComponent = view ? UserRow : USerCard;

	return (
		<div className={style.wrapper}>
			{users.map(user => (
				<UserComponent key={user.id} {...user} />
			))}
		</div>
	);
};

export default UsersListRows;
