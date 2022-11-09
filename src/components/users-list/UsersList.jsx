import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import { useUsers } from '../../lib/hooks/useUsers';
import UsersListPagination from './UsersListPagination';
import UsersListViewSelector from './UsersListViewSelector';
import { useReducer, useState } from 'react';

import {
	filtersReducer,
	FILTERS_INITIAL_USERS
} from '../../lib/reducers/filtersReducer';
import { reset } from '../../lib/actions/filtersActions';
import { UsersFormContext } from '../../lib/contexts/UsersFormContext';

const UsersList = () => {
	const [showRowsFormat, setShowRowsFormat] = useState(true);

	const [filters, dispatchFilters] = useReducer(
		filtersReducer,
		FILTERS_INITIAL_USERS
	);

	const { users, totalUsers, usersError, usersLoading } = useUsers(filters);

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			<UsersFormContext.Provider
				value={{ onSuccess: () => dispatchFilters(reset()) }}
			>
				<UsersListFilters
					search={filters.search}
					onlyActives={filters.onlyActives}
					sortBy={filters.sortBy}
					dispatchFilters={dispatchFilters}
				/>

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
			</UsersFormContext.Provider>
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
