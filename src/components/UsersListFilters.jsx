import { SORT_OPTIONS } from '../constants/sortOptions';
import InputCheckbox from './forms/InputCheckbox';
import InputSearch from './forms/InputSearch';
import Select from './forms/Select';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({
	search,
	setSearch,
	sortBy,
	setSortBy,
	onlyActives,
	setOnlyActives,
	slot
}) => {
	return (
		<div className={style.form}>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Select
					value={sortBy}
					onChange={e => setSortBy(Number(e.target.value))}
				>
					<option value={SORT_OPTIONS.DEFAULT}>Por defecto</option>
					<option value={SORT_OPTIONS.NAME}>Por nombre</option>
					<option value={SORT_OPTIONS.ROLE}>Por rol</option>
					{!onlyActives && (
						<option value={SORT_OPTIONS.ACTIVE}>Por activos</option>
					)}
				</Select>
			</div>
			<div className={style.row}>
				<div className={style.active}>
					<InputCheckbox
						className={style.checkbox}
						checked={onlyActives}
						onChange={e => setOnlyActives(e.target.checked)}
					/>
					<p>Mostrar sólo activos</p>
				</div>
				{slot}
			</div>
		</div>
	);
};

export default UsersListFilters;
