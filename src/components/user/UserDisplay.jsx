import style from './UserDisplay.module.css';

const UserDisplay = ({ username, name, picture }) => {
	return (
		<div className={style.wrapper}>
			<img
				className={style.picture}
				src={picture || '/user-pic.svg'}
				alt={`${name} picture`}
			/>
			<div className={style.display}>
				<span>{name}</span>
				<span className={style.username}>@{username}</span>
			</div>
		</div>
	);
};

export default UserDisplay;
