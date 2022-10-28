import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import useFilters from '../../lib/hooks/UseFilters';

import { useUsers } from '../../lib/hooks/useUsers';
import { getUsersToDisplay } from '../../lib/users/filterUsers';
import UsersFormLayout from '../user-forms/UsersFormContainer';
import UsersFormsProvider from '../providers/UsersFormProvider';
import UsersListPagination from './UsersListPagination';
import UsersListViewSelector from './UsersListViewSelector';
import { useState } from 'react';

const UsersList = () => {
	const [view, setView] = useState(true);
	const {
		filters,
		setSearch,
		setOnlyActives,
		setSortBy,
		setPage,
		setItemsPerPage,
		resetFilters
	} = useFilters();

	const { users, usersError, usersLoading, reloadUsers } = useUsers();

	const { paginatedUsers, totalPages } = getUsersToDisplay(users, filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersFormsProvider reloadUsers={reloadUsers} resetFilters={resetFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActives={filters.onlyActives}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setOnlyActives={setOnlyActives}
					setSortBy={setSortBy}
				/>
				<UsersListViewSelector view={view} setView={setView} />
				<UsersFormLayout />

				<UsersListRows
					users={paginatedUsers}
					usersError={usersError}
					usersLoading={usersLoading}
					view={view}
				/>
			</UsersFormsProvider>
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

export default UsersList;
