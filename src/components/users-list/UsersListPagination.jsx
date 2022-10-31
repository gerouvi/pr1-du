import style from './UsersListPagination.module.css';
import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';
import { PAGINATION } from '../../constants/pagination';
import {
	itemsPerPageChanged,
	pageChanged
} from '../../lib/actions/filtersActions';

const UsersListPagination = ({
	page,
	setPage,
	itemsPerPage,
	totalUsers,
	dispatchFilters
}) => (
	<div className={style.wrapper}>
		<div className={style.itemsPerPage}>
			<Select
				value={itemsPerPage}
				onChange={e => dispatchFilters(itemsPerPageChanged(e.taregt.value))}
			>
				{PAGINATION.ITEMS_PER_PAGE_VALUES.map(value => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</Select>
			<p>Elementos por página</p>
		</div>

		<PageSelector
			page={page}
			totalPages={Math.ceil(totalUsers / itemsPerPage)}
			setPage={newPage => dispatchFilters(pageChanged(newPage))}
		/>
	</div>
);

export default UsersListPagination;
