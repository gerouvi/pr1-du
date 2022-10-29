import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const INITIAL_USERS = {
	search: '',
	onlyActives: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: 1,
	itemsPerPage: 6
};

const useFilters = () => {
	const [filters, setFilters] = useState(INITIAL_USERS);

	const setSearch = search => {
		setFilters(prev => ({
			...prev,
			search,
			page: 1
		}));
	};

	const setOnlyActives = onlyActives => {
		const newSortBy =
			onlyActives && filters.sortBy === SORT_OPTIONS.ACTIVE
				? onlyActives
				: filters.sortBy;

		setFilters(prev => ({
			...prev,
			onlyActives,
			sortBy: newSortBy,
			page: 1
		}));
	};

	const setSortBy = sortBy => {
		setFilters(prev => ({
			...prev,
			sortBy,
			page: 1
		}));
	};

	const setPage = newPage => {
		setFilters(prev => ({
			...prev,
			page: newPage
		}));
	};

	const setItemsPerPage = newItemsPerPage => {
		setFilters(prev => ({
			...prev,
			itemsPerPage: newItemsPerPage,
			page: 1
		}));
	};

	const resetFilters = () => {
		setFilters({ ...INITIAL_USERS });
	};

	return {
		filters,
		filtersSetters: {
			setOnlyActives,
			setSortBy,
			setSearch
		},
		paginationSetters: {
			setItemsPerPage,
			setPage
		},
		resetFilters
	};
};

export default useFilters;
