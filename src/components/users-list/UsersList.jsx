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
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const { filters, dispatchFilters } = useFilters();

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersFormsProvider dispatchFilters={dispatchFilters}>
				<UsersListFilters
					search={filters.search}
					onlyActives={filters.onlyActives}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>
				<UsersFormLayout />
				<UsersListViewSelector
					showRowsFormat={showRowsFormat}
					setShowRowsFormat={setShowRowsFormat}
				/>

				<UsersListRows
					users={users}
					usersError={usersError}
					usersLoading={usersLoading}
					showRowsFormat={showRowsFormat}
				/>
			</UsersFormsProvider>
			<UsersListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				totalUsers={totalUsers}
				dispatchFilters={dispatchFilters}
			/>
		</div>
	);
};

export default UsersList;
