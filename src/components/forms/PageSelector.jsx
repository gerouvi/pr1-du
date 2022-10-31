import IconButton from '../buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import style from './PageSelector.module.css';

const PageSelector = ({ page, dispatchFilters, totalPages }) => {
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages || totalPages === 0;
	return (
		<div className={style.wrapper}>
			<IconButton
				filled
				disabled={isFirstPage}
				icon={ArrowLeftIcon}
				onClick={() =>
					dispatchFilters({ type: 'page_changed', value: page - 1 })
				}
			/>
			<span>
				Página {page} de {totalPages || 1}
			</span>
			<IconButton
				filled
				disabled={isLastPage}
				icon={ArrowRightIcon}
				onClick={() =>
					dispatchFilters({ type: 'page_changed', value: page + 1 })
				}
			/>
		</div>
	);
};

export default PageSelector;
