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
import UserEditForm from './user-forms/UserEditForm';
import UserDeleteForm from './user-forms/UserDeleteForm';

const UsersList = () => {
	const {
		currentForm,
		currentUser,
		setCreateForm,
		setFiltersForm,
		setEditForm,
		setDeleteForm
	} = useForm();

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
					{currentForm === USERS_FORMS.CREATE && (
						<UserCreateForm onSuccess={onSuccess} />
					)}
					{currentForm === USERS_FORMS.EDIT && (
						<UserEditForm onSuccess={onSuccess} user={currentUser} />
					)}
					{currentForm === USERS_FORMS.DELETE && (
						<UserDeleteForm
							onSuccess={onSuccess}
							user={currentUser}
							onCancel={setFiltersForm}
						/>
					)}
				</UsersFormLayout>
			)}

			<UsersListRows
				users={paginatedUsers}
				usersError={usersError}
				usersLoading={usersLoading}
				setEditForm={setEditForm}
				setDeleteForm={setDeleteForm}
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
	const [currentForm, setCurrentForm] = useState({ form: USERS_FORMS.FILTERS });

	const setFiltersForm = () => setCurrentForm({ form: USERS_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USERS_FORMS.CREATE });
	const setEditForm = user =>
		setCurrentForm({
			form: USERS_FORMS.EDIT,
			user
		});
	const setDeleteForm = user =>
		setCurrentForm({ form: USERS_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
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
