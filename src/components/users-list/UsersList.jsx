import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import { useUsers } from '../../lib/hooks/useUsers';
import UsersFormLayout from '../user-forms/UsersFormContainer';
import UsersFormsProvider from '../providers/UsersFormProvider';
import UsersListPagination from './UsersListPagination';
import UsersListViewSelector from './UsersListViewSelector';
import { useReducer, useState } from 'react';
import { FILTERS_ACTIONS } from '../../constants/filtersActions';
import {
	filtersReducer,
	FILTERS_INITIAL_USERS
} from '../../lib/reducers/filtersReducer';

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
			<UsersFormsProvider
				resetFilters={() => dispatchFilters({ type: FILTERS_ACTIONS.RESET })}
			>
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
