import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import style from './UsersListViewSelector.module.css';

const UsersListViewSelector = ({ view, setView }) => (
	<div className={style.wrapper}>
		<button
			className={style.button}
			onClick={() => setView(true)}
			disabled={view}
		>
			<ListIcon className={style.icon} />
		</button>
		<div className={style.divider} />
		<button
			className={style.button}
			onClick={() => setView(false)}
			disabled={!view}
		>
			<GridIcon className={style.icon} />
		</button>
	</div>
);

export default UsersListViewSelector;
