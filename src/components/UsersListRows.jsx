import UserRow from './UserRow';

const UsersListRows = ({
	users,
	usersError,
	usersLoading,
	setEditForm,
	setDeleteForm
}) => {
	if (usersLoading) return <p>Cargando...</p>;
	if (usersError) return <p>Error al cargar los usuarios</p>;
	if (!users.length) return <p>No hay usuarios</p>;

	return users.map(user => (
		<UserRow
			key={user.id}
			{...user}
			setEditForm={setEditForm}
			setDeleteForm={setDeleteForm}
		/>
	));
};

export default UsersListRows;
