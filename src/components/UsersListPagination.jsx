import style from './UsersListPagination.module.css';
import Select from './forms/Select';
import PageSelector from './forms/PageSelector';

const UsersListPagination = ({
	page,
	setPage,
	itemsPerPage,
	setItemsPerPage,
	totalPages
}) => (
	<div className={style.wrapper}>
		<div className={style.itemsPerPage}>
			<Select
				value={itemsPerPage}
				onChange={e => setItemsPerPage(Number(e.target.value))}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
			</Select>
			<p>Elementos por página</p>
		</div>

		<PageSelector page={page} setPage={setPage} totalPages={totalPages} />
	</div>
);

export default UsersListPagination;
