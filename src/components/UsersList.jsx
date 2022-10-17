import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';

import {
	filterActiveUsers,
	filterUsersByName,
	paginationUsers,
	sortUsers
} from '../lib/users/filterUsers';
import useFilters from '../lib/hooks/UseFilters';
import UsersListPagination from './UsersListPagination';

const UsersList = ({ initialUsers }) => {
	const {
		filters,
		setSearch,
		setOnlyActives,
		setSortBy,
		setPage,
		setItemsPerPage
	} = useFilters();

	const { users, totalPages } = getUsers(initialUsers, filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersListFilters
				search={filters.search}
				onlyActives={filters.onlyActives}
				sortBy={filters.sortBy}
				setSearch={setSearch}
				setOnlyActives={setOnlyActives}
				setSortBy={setSortBy}
			/>
			<UsersListRows users={users} />
			<UsersListPagination
				page={filters.page}
				setPage={setPage}
				itemsPerPage={filters.itemsPerPage}
				setItemsPerPage={setItemsPerPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

const getUsers = (
	initialUsers,
	{ onlyActives, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(initialUsers, onlyActives);

	usersFiltered = filterUsersByName(usersFiltered, search);

	usersFiltered = sortUsers(usersFiltered, sortBy);

	const totalPages = Math.ceil(usersFiltered.length / itemsPerPage);

	usersFiltered = paginationUsers(usersFiltered, page, itemsPerPage);

	return { users: usersFiltered, totalPages };
};

export default UsersList;
