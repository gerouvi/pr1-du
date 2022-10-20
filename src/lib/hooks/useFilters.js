import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActives: false,
		sortBy: SORT_OPTIONS.DEFAULT,
		page: 1,
		itemsPerPage: 6
	});

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

	return {
		filters,
		setSearch,
		setOnlyActives,
		setSortBy,
		setPage,
		setItemsPerPage
	};
};

export default useFilters;
