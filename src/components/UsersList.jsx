import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import UsersListFilters from './UsersListFilters';
import useFilters from '../lib/hooks/UseFilters';
import UsersListPagination from './UsersListPagination';
import { useUsers } from '../lib/hooks/useUsers';

const UsersList = () => {
	const {
		filters,
		setSearch,
		setOnlyActives,
		setSortBy,
		setPage,
		setItemsPerPage
	} = useFilters();

	const { users, totalPages, error, loading } = useUsers(filters);

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
			<UsersListRows users={users} error={error} loading={loading} />
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
