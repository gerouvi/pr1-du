import style from './UsersListPagination.module.css';
import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';

const UsersListPagination = ({
	page,
	setPage,
	itemsPerPage,
	setItemsPerPage,
	totalUsers
}) => (
	<div className={style.wrapper}>
		<div className={style.itemsPerPage}>
			<Select
				value={itemsPerPage}
				onChange={e => setItemsPerPage(Number(e.target.value))}
			>
				<option value={4}>4</option>
				<option value={6}>6</option>
				<option value={8}>8</option>
			</Select>
			<p>Elementos por página</p>
		</div>

		<PageSelector
			page={page}
			setPage={setPage}
			totalPages={Math.ceil(totalUsers / itemsPerPage)}
		/>
	</div>
);

export default UsersListPagination;
