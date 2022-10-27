import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import useFilters from '../lib/hooks/UseFilters';
import UsersListPagination from './UsersListPagination';
import { useUsers } from '../lib/hooks/useUsers';
import { useState } from 'react';
import { USERS_FORMS } from '../constants/usersForms';
import Button from './buttons/Button';
import UserCreateForm from './user-forms/UserCreateForm';
import {
	filterActiveUsers,
	filterUsersByName,
	paginationUsers,
	sortUsers
} from '../lib/users/filterUsers';
import UsersFormLayout from './user-forms/UsersFormLayout';

const UsersList = () => {
	const { currentForm, setCreateForm, setFiltersForm } = useForm();

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

	const onSuccess = () => {
		setFiltersForm();
		reloadUsers();
		resetFilters();
	};

	return (
		<div className={style.wrapper}>
			<h1 className={style.title}>Listado de usuarios</h1>
			{currentForm === USERS_FORMS.FILTERS ? (
				<UsersListFilters
					search={filters.search}
					onlyActives={filters.onlyActives}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setOnlyActives={setOnlyActives}
					setSortBy={setSortBy}
					slot={<Button onClick={setCreateForm}>Añadir usuario</Button>}
				/>
			) : (
				<UsersFormLayout onClose={setFiltersForm}>
					<UserCreateForm onSuccess={onSuccess} />
				</UsersFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				usersError={usersError}
				usersLoading={usersLoading}
			/>
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

const useForm = () => {
	const [currentForm, setCurrentForm] = useState(USERS_FORMS.FILTERS);

	const setFiltersForm = () => setCurrentForm(USERS_FORMS.FILTERS);
	const setCreateForm = () => setCurrentForm(USERS_FORMS.CREATE);
	const setEditForm = () => setCurrentForm(USERS_FORMS.EDIT);
	const setDeleteForm = () => setCurrentForm(USERS_FORMS.DELETE);

	return {
		currentForm,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};
const getUsersToDisplay = (
	users,
	{ onlyActives, search, sortBy, page, itemsPerPage }
) => {
	let usersFiltered = filterActiveUsers(users, onlyActives);
	usersFiltered = filterUsersByName(usersFiltered, search);
	usersFiltered = sortUsers(usersFiltered, sortBy);
	const { paginatedUsers, totalPages } = paginationUsers(
		usersFiltered,
		page,
		itemsPerPage
	);
	return { paginatedUsers, totalPages };
};

export default UsersList;
