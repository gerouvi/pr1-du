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

export const filtersReducer = (state, { type, payload }) => {
	switch (type) {
		case FILTERS_ACTIONS.SEARCH:
			return {
				...state,
				search: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.ONLY_ACTIVES: {
			const newSortBy =
				payload && state.sortBy === SORT_OPTIONS.ACTIVE
					? SORT_OPTIONS.DEFAULT
					: state.sortBy;

			return {
				...state,
				sortBy: newSortBy,
				page: PAGINATION.DEFAULT_PAGE,
				onlyActives: payload
			};
		}
		case FILTERS_ACTIONS.SORT_BY:
			return {
				...state,
				sortBy: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.PAGE:
			return {
				...state,
				page: payload
			};
		case FILTERS_ACTIONS.ITEMS_PER_PAGE:
			return {
				...state,
				itemsPerPage: payload,
				page: PAGINATION.DEFAULT_PAGE
			};
		case FILTERS_ACTIONS.RESET:
			return { ...FILTERS_INITIAL_USERS };
		default: {
			throw new Error('Invalid action type');
		}
	}
};
