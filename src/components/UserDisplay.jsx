import style from './UserDisplay.module.css';

const UserDisplay = ({ username, name }) => (
	<div className={style.wrapper}>
		<span>{name}</span>
		<span className={style.username}>@{username}</span>
	</div>
);

export default UserDisplay;
