import { useEffect, useState } from 'react';
import {
	filterActiveUsers,
	filterUsersByName,
	paginationUsers,
	sortUsers
} from '../users/filterUsers';

const fetchUsers = async (setData, setError, signal) => {
	try {
		const res = await fetch('http://localhost:4000/users', {
			signal
		});
		if (res.ok) {
			const data = await res.json();

			setData(data);
		} else {
			setError();
		}
	} catch (err) {
		setError();
	}
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

export const useUsers = filters => {
	const [users, setUsers] = useState({
		data: [],
		error: false,
		loading: true
	});
	const setData = newData =>
		setUsers({ data: newData, loading: false, error: false });

	const setError = () => setUsers({ data: [], error: true, loading: false });

	useEffect(() => {
		const controller = new AbortController();

		fetchUsers(setData, setError, controller.signal);

		return () => controller.abort();
	}, []);

	const { paginatedUsers, totalPages } = getUsersToDisplay(users.data, filters);

	return {
		users: paginatedUsers,
		totalPages,
		error: users.error,
		loading: users.loading
	};
};