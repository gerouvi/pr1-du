import { FILTERS_ACTIONS } from '../../constants/filtersActions';
import { PAGINATION } from '../../constants/pagination';
import { SORT_OPTIONS } from '../../constants/sortOptions';

export const FILTERS_INITIAL_USERS = {
	search: '',
	onlyActives: false,
	sortBy: SORT_OPTIONS.DEFAULT,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const filtersReducer = (state, action) => {
	switch (action.type) {
		case FILTERS_ACTIONS.SEARCH:
			return {
				...state,
				search: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.ONLY_ACTIVES: {
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
		case FILTERS_ACTIONS.SORT_BY:
			return {
				...state,
				sortBy: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.PAGE:
			return {
				...state,
				page: action.value
			};
		case FILTERS_ACTIONS.ITEMS_PER_PAGE:
			return {
				...state,
				itemsPerPage: action.value,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.RESET:
			return { ...FILTERS_INITIAL_USERS };
		default: {
			throw new Error('Invalid action type');
		}
	}
};
