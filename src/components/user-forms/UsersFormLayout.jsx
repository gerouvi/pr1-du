import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import style from './UsersFormLayout.module.css';

const UsersFormLayout = ({ onClose, children }) => (
	<div className={style.wrapper}>
		<IconButton
			className={style.close}
			icon={CrossIcon}
			filled
			onClick={onClose}
		/>
		{children}
	</div>
);

export default UsersFormLayout;
