import { useState } from 'react';
import { SORT_OPTIONS } from '../../constants/sortOptions';
import {
	onlyActivesChanged,
	searchChanged,
	sortByChanged
} from '../../lib/actions/filtersActions';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputSearch from '../forms/InputSearch';
import Select from '../forms/Select';
import Modal from '../modal/Modal';
import UserCreateForm from '../user-forms/UserCreateForm';
import style from './UsersListFilters.module.css';

const UsersListFilters = ({ search, onlyActives, sortBy, dispatchFilters }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={style.form}>
			<Modal closeModal={() => setShowModal(false)}>
				{showModal && <UserCreateForm closeModal={() => setShowModal(false)} />}
			</Modal>
			<div className={style.row}>
				<InputSearch
					placeholder='Buscar...'
					value={search}
					onChange={e => dispatchFilters(searchChanged(e.target.value))}
				/>
				<Select
					value={sortBy}
					onChange={e => dispatchFilters(sortByChanged(Number(e.target.value)))}
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
						onChange={e =>
							dispatchFilters(onlyActivesChanged(e.target.checked))
						}
					/>
					<p>Mostrar sólo activos</p>
				</div>
				<Button onClick={() => setShowModal(true)}>Añadir usuario</Button>
			</div>
		</div>
	);
};

export default UsersListFilters;
