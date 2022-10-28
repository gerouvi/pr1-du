import { useContext } from 'react';
import { SORT_OPTIONS } from '../constants/sortOptions';
import { USERS_FORMS } from '../constants/usersForms';
import { UsersFormContext } from '../lib/contexts/UsersFormContext';
import Button from './buttons/Button';
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
	setOnlyActives
}) => {
	const { currentForm, setCreateForm } = useContext(UsersFormContext);

	if (currentForm !== USERS_FORMS.FILTERS) return null;
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
				<Button onClick={setCreateForm}>Añadir usuario</Button>
			</div>
		</div>
	);
};

export default UsersListFilters;
