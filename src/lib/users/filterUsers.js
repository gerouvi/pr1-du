import { SORT_OPTIONS } from '../../constants/sortOptions';
import { USERS_ROLES } from '../../constants/usersRoles';

export const filterActiveUsers = (users, onlyActive) => {
	if (!onlyActive) return [...users];

	return users.filter(user => user.active);
};

export const filterUsersByName = (users, search) => {
	if (!search) return [...users];

	const lowerCaseSearch = search.toLowerCase();

	return users.filter(user =>
		user.name.toLowerCase().includes(lowerCaseSearch)
	);
};

export const sortUsers = (users, sortBy) => {
	const sortedUsers = [...users];

	switch (sortBy) {
		case SORT_OPTIONS.NAME:
			return sortedUsers.sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
		case SORT_OPTIONS.ROLE:
			return sortedUsers.sort((a, b) => {
				if (a.role === b.role) return 0;
				if (a.role === USERS_ROLES.TEACHER) return -1;
				if (a.role === USERS_ROLES.STUDENT && b.role === USERS_ROLES.OTHER)
					return -1;
				return 1;
			});
		case SORT_OPTIONS.ACTIVE:
			return sortedUsers.sort((a, b) => {
				if (a.active === b.active) return 0;
				if (a.active && !b.active) return -1;
				return 1;
			});
		default:
			return sortedUsers;
	}
};

export const paginationUsers = (users, page, itemsPerPage) => {
	const startIndex = (page - 1) * itemsPerPage;
	const lastIndex = startIndex + itemsPerPage;
	const totalPages = Math.ceil(users.length / itemsPerPage);
	const paginatedUsers = users.slice(startIndex, lastIndex);

	return { paginatedUsers, totalPages };
};