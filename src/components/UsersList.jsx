import { useState } from 'react';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';

import {
	filterActiveUsers,
	filterUsersByName,
	sortUsers
} from '../lib/users/filterUsers';
import useFilters from '../lib/hooks/UseFilters';

const UsersList = ({ initialUsers }) => {
	const { search, onlyActives, sortBy, ...setFiltersFunctions } = useFilters();
	const { users } = useUsers(initialUsers);

	let usersFiltered = filterActiveUsers(users, onlyActives);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilters
				search={search}
				onlyActives={onlyActives}
				sortBy={sortBy}
				{...setFiltersFunctions}
			/>
			<UsersListRows users={usersFiltered} />
		</div>
	);
};

const useUsers = initialUsers => {
	const [users] = useState(initialUsers);

	return { users };
};

export default UsersList;
