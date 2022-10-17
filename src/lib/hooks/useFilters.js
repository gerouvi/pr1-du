import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const useFilters = () => {
	const [filters, setFilters] = useState({
		search: '',
		onlyActives: false,
		sortBy: 0
	});

	const setSearch = search => {
		setFilters(prev => ({
			...prev,
			search
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
			sortBy: newSortBy
		}));
	};

	const setSortBy = sortBy => {
		setFilters(prev => ({
			...prev,
			sortBy
		}));
	};

	return {
		...filters,
		setSearch,
		setOnlyActives,
		setSortBy
	};
};

export default useFilters;
