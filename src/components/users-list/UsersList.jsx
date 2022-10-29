import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import useFilters from '../../lib/hooks/UseFilters';
import { useUsers } from '../../lib/hooks/useUsers';
import UsersFormLayout from '../user-forms/UsersFormContainer';
import UsersFormsProvider from '../providers/UsersFormProvider';
import UsersListPagination from './UsersListPagination';
import UsersListViewSelector from './UsersListViewSelector';
import { useState } from 'react';

const UsersList = () => {
	const [view, setView] = useState(true);
	const { filters, filtersSetters, paginationSetters, resetFilters } =
		useFilters();

	const { users, usersCount, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersFormsProvider resetFilters={resetFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActives={filters.onlyActives}
					sortBy={filters.sortBy}
					{...filtersSetters}
				/>
				<UsersFormLayout />
				<UsersListViewSelector view={view} setView={setView} />

				<UsersListRows
					users={users}
					usersError={usersError}
					usersLoading={usersLoading}
					view={view}
				/>
			</UsersFormsProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				{...paginationSetters}
				totalUsers={usersCount}
			/>
		</div>
	);
};

export default UsersList;
