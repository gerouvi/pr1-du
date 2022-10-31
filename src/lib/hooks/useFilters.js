import { useReducer } from 'react';
import { PAGINATION } from '../../constants/pagination';
import { SORT_OPTIONS } from '../../constants/sortOptions';

const INITIAL_USERS = {
	search: '',
	onlyActives: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};
const filtersReducer = (state, action) => {
	switch (action.type) {
		case 'search_changed':
			return {
				...state,
				search: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case 'only_actives_changed': {
			const newSortBy =
				action.value && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;

			return {
				...state,
				sortBy: newSortBy,
				page: PAGINATION.DEFAULT_PAGE,
				onlyActives: action.value
			};
		}
		case 'sort_by_changed':
			return {
				...state,
				sortBy: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case 'page_changed':
			return {
				...state,
				page: action.value
			};
		case 'items_per_page_changed':
			return {
				...state,
				itemsPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case 'reset':
			return { ...INITIAL_USERS };
		default: {
			console.log(action.type);
			throw new Error('Invalid action type');
		}
	}
};

const useFilters = () => {
	const [filters, dispatchFilters] = useReducer(filtersReducer, INITIAL_USERS);

	return {
		filters,
		dispatchFilters
	};
};

export default useFilters;
